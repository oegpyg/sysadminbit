#coding: utf-8
import datetime
from django.core.mail import EmailMultiAlternatives
import re
import lxml.html
import unicodecsv
import requests
import zipfile

__author__ = 'pedroleguizamon'
import copy



def mes_palabra(mes):
    if mes == 1:
        return 'ENERO'
    if mes == 2:
        return 'FEBRERO'
    if mes == 3:
        return 'MARZO'
    if mes == 4:
        return 'ABRIL'
    if mes == 5:
        return 'MAYO'
    if mes == 6:
        return 'JUNIO'
    if mes == 7:
        return 'JULIO'
    if mes == 8:
        return 'AGOSTO'
    if mes == 9:
        return 'SETIEMBRE'
    if mes == 10:
        return 'OCTUBRE'
    if mes == 11:
        return 'NOVIEMBRE'
    if mes == 12:
        return 'DICIEMBRE'
    return mes

def dict_to_unicode(data):
    t_data = copy.deepcopy(data)
    for k, v in t_data.iteritems():
        if isinstance(v, str):
            u_v = unicode(v, errors='ignore')
            data[k] = u_v
    return data


def informar_via_mail(asunto, f_dst, mensaje, html_content, destinatarios):
    """
    Informa sobre un incidente via email, a traves de la interfaz de correos de django
    """
    msg = EmailMultiAlternatives(asunto, mensaje,
                                 f_dst,
                                 destinatarios)
    msg.attach_alternative(html_content, "text/html")
    msg.send()


def dict_int_none(value):
    if value == None:
        return 0
    else:
        return value

def gen_identificador(parent_module, model, parametro):
    models = __import__(parent_module, globals(), locals(), [model], -1)
    model = getattr(models, model)
    try:
        lastid = model.objects.all().order_by('-%s' % parametro)[0]
        lastid = getattr(lastid, parametro)
    except:
        lastid = 0

    while True:
        nlastid = lastid + 1
        pt = { parametro: nlastid }
        try:
            model.objects.get(**pt)
        except model.DoesNotExist:
            return nlastid
        else:
            lastid = model.objects.all().order_by('-%s' % parametro)[0]
            lastid = getattr(lastid, parametro)

def dict_remove_none(data):
    t_data = copy.deepcopy(data)
    for k, v in t_data.iteritems():
        if isinstance(v, str) or isinstance(v, unicode):
            if v.strip() == '':
                data.pop(k)
                continue
        if v == None:
            data.pop(k)
            continue
    return data


def tail(f, n, offset=None):
    """Reads a n lines from f with an offset of offset lines.  The return
    value is a tuple in the form ``(lines, has_more)`` where `has_more` is
    an indicator that is `True` if there are more lines in the file.
    """
    avg_line_length = 74
    to_read = n + (offset or 0)

    while 1:
        try:
            f.seek(-(avg_line_length * to_read), 2)
        except IOError:
            # woops.  apparently file is smaller than what we want
            # to step back, go to the beginning instead
            f.seek(0)
        pos = f.tell()
        lines = f.read().splitlines()
        if len(lines) >= to_read or pos == 0:
            return lines[-to_read:offset and -offset or None]
            # return lines[-to_read:offset and -offset or None], \
            #        len(lines) > to_read or pos > 0
        avg_line_length *= 1.3


def conver_model_from_csv(csv_file, delimitador, quotechar):
    """
    Arma una maqueta par la creacion de modelos a partir de un archivo de exportacion
    """

    model_meta = {}
    data_file = list(unicodecsv.reader(open(csv_file), delimiter=delimitador, quotechar=quotechar))
    for index, da in enumerate(data_file[0]):
        model_meta[index] = {'nombre_campo': da, 'tipo': '', 'longitud': '', 'default': '*NO_TIENE*'}
        datos = []
        for b in data_file[1:]:
            datos.append(b[index])
        datos.sort()
        model_meta[index]['longitud'] = len(unicode(b[index]))
        entero = True
        enteros = []
        for a in datos:
            try:
                int(a)
                enteros.append(int(a))
            except:
                entero = False
                enteros = []

            if re.findall('^[0-9]+\.[0-9]+$', a.strip()):
                model_meta[index]['tipo'] = 'DECIMAL'
                model_meta[index]['syntaxis'] = "models.DecimalField(max_digits=19, decimal_places=6, default=0)"

            if re.findall('^[0-9]+,[0-9]+$', a.strip()):
                model_meta[index]['tipo'] = 'DECIMAL'
                model_meta[index]['syntaxis'] = "models.DecimalField(max_digits=19, decimal_places=6, default=0)"

        if entero:
            model_meta[index]['tipo'] = 'INTEGER'
            model_meta[index]['syntaxis'] = "models.BigIntegerField(default=0)"
        else:
            if model_meta[index]['tipo'] != 'DECIMAL':
                model_meta[index]['tipo'] = 'VARCHAR'
                longitud = (model_meta[index]['longitud'] + 30)
                model_meta[index]['syntaxis'] = "models.CharField(max_length=%s,default='*NO TIENE*')" % longitud
        try:
            datetime.datetime.strptime(a, '%d/%m/%Y %H:%M:%S')
        except:
            pass
        else:
            model_meta[index]['tipo'] = 'DATETIME'
            model_meta[index]['syntaxis'] = "models.DateTimeField(null=True, blank=True)"
        #ver si es decimal

        #si es booleano
        if enteros:
            enteros = set(enteros)
            sb = set()
            sb.add(0)
            sb.add(1)
            if len(enteros) == 2:
                if not enteros.difference(sb):
                    model_meta[index]['tipo'] = 'BOOLEAN'
                    model_meta[index]['syntaxis'] = "models.BooleanField(default=False)"

            if len(enteros) == 1:
                sb.clear()
                sb.add(0)
                if not enteros.difference(sb):
                    model_meta[index]['tipo'] = 'BOOLEAN'
                    model_meta[index]['syntaxis'] = "models.BooleanField(default=False)"
                sb.clear()
                sb.add(1)
                if not enteros.difference(sb):
                    model_meta[index]['tipo'] = 'BOOLEAN'
                    model_meta[index]['syntaxis'] = "models.BooleanField(default=False)"
    return model_meta



def import_to_converter_model(csv_file, delimitador, quotechar, excludes, formato_fecha, model_obj):
    """
    Arma una maqueta par la creacion de modelos a partir de un archivo de exportacion
    """
    data_file = list(unicodecsv.reader(open(csv_file), delimiter=delimitador, quotechar=quotechar))
    parametros = {}
    model_bulk_object = []
    for index, da in enumerate(data_file[0]):
        if da in excludes:
            continue

        parametros[da] = ''

    for da in data_file[1:]:

        for index, f in enumerate(data_file[0]):
            if f in excludes:
                continue
            if da[index].strip() == '':
                continue
            parametros[f] = da[index].strip()

            for mt in model_obj._meta.fields:
                if mt.name == f:
                    if mt.get_internal_type() == 'DateTimeField':
                        parametros[f] = datetime.datetime.strptime(da[index], formato_fecha)
        model_bulk_object.append(model_obj(**parametros))

    return model_bulk_object


def get_cotizacion_from_dna(url, label_filter, parametros):
    response = requests.get(url, params = parametros)
    uhtml = lxml.html.fromstring(response.text)
    cotizazion_table = uhtml.cssselect('table')[1]
    rows = cotizazion_table.cssselect('tr')
    for row in rows:
        tds = row.cssselect('td')
        for index, td in enumerate(tds):
            if td.text_content().strip() == label_filter:
                data_requerido = tds[index+1].text_content().strip()

    return data_requerido, lxml.html.tostring(cotizazion_table)


def create_geo_data(url, pais, pais_cod, model_obj):
    """
    Se crea la base de datos geograficas en la aplicaion imp (impresiones)
    a partir de los datos obtenidos de  http://download.geonames.org/export/dump/
    http://download.geonames.org/export/dump/PY.zip
    """

    f_p = '%s/%s.zip' % (url, pais_cod)
    r = requests.get(f_p, stream=True)
    arch = '/tmp/%s.zip' % pais_cod

    with open(arch, 'wb') as f:
        for chunk in r.iter_content(chunk_size=1024):
            if chunk: # filter out keep-alive new chunks
                f.write(chunk)
                f.flush()

    pais_arch_zip = open(arch, 'rb')
    z = zipfile.ZipFile(pais_arch_zip)
    for name in z.namelist():
        dirs = "/tmp/"
        z.extract(name, path=dirs)
    pais_arch_zip.close()

    pais_data = unicodecsv.UnicodeReader(open('/tmp/%s.txt' % pais_cod, 'r'), delimiter='\t')


    for pd in pais_data:
        pd = map(unicode.strip, pd)

        parametros = {
            'pais': pais,
            'latitud': pd[4],
            'longitud': pd[5],
            'pais_codigo': pd[8],
            'ciudad': pd[1].encode('ascii', 'replace')[0:200],
            'ciudad_alternativas': pd[3].encode('ascii', 'replace')[0:500],
            'poblacion': pd[14],
            'elevacion': pd[15],
            'densidad': pd[16],
            'zona_horaria': pd[17],
            'ultima_modificacion': pd[18]
        }
        model_obj.objects.create(**parametros)

