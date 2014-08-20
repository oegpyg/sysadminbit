#TODO: ARMAR INTERFAZ PARA SETEAR IMPRESORAS POR USUARIO
import datetime
__author__ = 'pedroleguizamon'
import cups
from django.conf import settings
import os
from decimal import Decimal
from lxml import etree, objectify
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, legal
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch, mm
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph, Table, TableStyle
from sbcommon import utils
import uuid
from subprocess import Popen, PIPE, STDOUT, call
from hubarcode.code128 import Code128Encoder
from fpdf import FPDF
from wand.image import Image
import copy

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

from babel.numbers import format_number, format_decimal, format_percent

def callback_admin(prompt):
      return settings.CUPS_ADMIN[-1]

class CupsServer(object):
    def __init__(self, usuario, clave):
        self.gpp = clave
        cups.setServer(settings.CUPS_SERVER.get('maestro'))
        cups.setUser(usuario)

    def modo_usuario(self):
        cups.setPasswordCB(self.callback)
        self.cups_con = cups.Connection()

    def modo_admin(self):
        cups.setServer(settings.CUPS_SERVER.get('maestro'))
        cups.setUser(settings.CUPS_ADMIN[0])
        cups.setPasswordCB(callback_admin)
        self.cups_con = cups.Connection()

    def listar_impresoras(self):
        return self.cups_con.getPrinters()

    def callback(self):
        return self.gpp

    def imprimir_trabajo(self, impresora, ruta, opciones):
        base = os.path.basename(ruta)
        self.cups_con.printFile(impresora, ruta, base, opciones)
        return {'exitos': 'Enviado para impresion a %s' % impresora}

def print_web_page(request, url, printer, wait):
    """Valiendonos de phantomjs realizamos una impresion, de nuestro contenido web"""
    tmp_file = open('/tmp/phan.txt', 'w+')
    # Get the current user cookie
    cookies = request.COOKIES
    # Write csrftoken and sessionid to a local file
    tmp_file.write(cookies['csrftoken'] + ' ' + cookies['sessionid'])
    # Write all the information was passed from the url to the same local file
    tmp_file.close()
    dst_file = '/tmp/printer_web_%s.png' % str(uuid.uuid4().fields[-1])

    print url
    external_process = Popen(['%s/phantomjs' % settings.PHANTOM_JS_PATH,
                              # '--debug=true',
                              '--disk-cache=true',
                              '--max-disk-cache-size=25600',
                             '%s/printing_web_page.js' % settings.PHANTOM_JS_PATH,
                             # 'http://localhost:8000/sman/administrador_ventas?listar_pedidos=true&verificar=true&fecha_i=25/04/2014&fecha_f=25/04/2014',
                             url,
                             dst_file,
                             settings.PHANTOM_DOMAIN,
                             settings.PHANTOM_PORT,
                             wait
                             ],
                            stdout=PIPE, stderr=STDOUT)
    out = external_process.stdout.read()
    # print out
    # Open the file created by PhantomJS
    # return_file = File(open(file_name, 'r'))
    # response = HttpResponse(return_file, mimetype='application/force-download')
    # response['Content-Disposition'] = 'attachment; filename=current_page.pdf'
    # Return the file to the browser and force it as download item
    return dst_file


def imprimir_etiquetas(palletsobjs, usuario, reimpresion):
    ETIQUETA_DIR = '%s/label_files' % PROJECT_ROOT
    ahora = datetime.datetime.now()
    for pallobj in palletsobjs:
        pdf=FPDF('P','cm',(10, 12.5))
        pdf.add_page()
        pdf.set_font('Arial',style='',size=55)
        pdf.set_y(1)
        pdf.set_x(0.6)
        if  pallobj.pallet_completo_010:
            pdf.cell(1, 0, '%s-C'  % pallobj.pall_numero, align='L')
        else:
            pdf.cell(1, 0, '%s-I'  % pallobj.pall_numero, align='L')
        # pdf.cell(1, 0, '%s'  % '23423554', align='L')
        pdf.set_font('Arial',style='',size=5)
        pdf.set_y(2.2)
        pdf.set_x(8.5)
        pdf.cell(1, 0, '%s' % ahora.strftime('%d/%m/%Y'), align='R')
        pdf.set_y(2.4)
        pdf.set_x(8.5)
        pdf.cell(1,0, '%s' % ahora.strftime('%H:%M:%S'), align='R')
        pdf.set_y(2.6)
        pdf.set_x(8.5)
        pdf.cell(1,0, usuario, align='R')
        pdf.set_font('Arial',style='',size=8)
        pdf.set_y(2.2)
        pdf.set_x(0.6)
        pdf.cell(1,0, 'PROFORMA: ', align='L')
        pdf.set_x(2.8)
        pdf.cell(1,0, pallobj.pall_proforma, align='L')
        pdf.set_y(2.6)
        pdf.set_x(0.6)
        pdf.cell(1,0, 'LOTE: ', align='L')
        pdf.set_x(2.8)
        pdf.cell(1,0, pallobj.articulo_lote, align='L')
        #vencimiento
        pdf.set_y(3)
        pdf.set_x(0.6)
        pdf.cell(1,0, 'VENCIMIENTO: ', align='L')
        pdf.set_x(2.8)
        pdf.cell(1,0, pallobj.articulo_fecha_vencimiento.strftime('%d/%m/%Y'), align='L')
        #cajas
        pdf.set_y(3.4)
        pdf.set_x(0.6)
        pdf.cell(1,0, 'CAJAS: ', align='L')
        pdf.set_x(2.8)
        pdf.cell(1,0, str(pallobj.pall_articulo_cajas), align='L')
        #unidades
        pdf.set_x(3.5)
        pdf.cell(1,0, 'UNIDADES:', align='L')
        pdf.set_x(5.2)
        pdf.cell(1,0, str(pallobj.pall_articulo_unidades), align='L')
        #totales
        pdf.set_x(5.6)
        pdf.cell(1,0, 'TOTAL:', align='L')
        pdf.set_x(6.7)
        pdf.cell(1,0, str(pallobj.get_pall_cantidad()), align='L')
        #averiados
        pdf.set_y(3.8)
        pdf.set_x(0.6)
        pdf.cell(1,0, 'AVERIADOS: ', align='L')
        pdf.set_x(2.8)
        pdf.cell(1,0, str(pallobj.pall_averiados_cantidad_cajas), align='L')
        #averiados unidades
        pdf.set_x(3.5)
        pdf.cell(1,0, 'UNIDADES:', align='L')
        pdf.set_x(5.2)
        pdf.cell(1,0, str(pallobj.pall_averiados_cantidad_sueltas), align='L')
        #totales averiados
        pdf.set_x(5.6)
        pdf.cell(1,0, 'TOTAL:', align='L')
        pdf.set_x(6.7)
        pdf.cell(1,0, str(pallobj.get_pall_cantidad_averiados()), align='L')
        #linea
        pdf.line(0.5, 4, 9.5, 4)
        #seccion producto

        barra_articulo = Code128Encoder(str(pallobj.articulo_cod),options={'height':60, 'label_border': 1, 'bottom_border': 5})
        barra_articulo.save('%s/%s.png' % (ETIQUETA_DIR, pallobj.articulo_cod), bar_width=1)
        pdf.image('%s/%s.png' % (ETIQUETA_DIR, pallobj.articulo_cod), x=0.5, y=4.1)
        #linea vertical, separa codigo barra articulo de la descripcion del articulo
        pdf.line(3.1, 4, 3.1, 6.5)
        #descripcion del articulo
        pdf.set_y(4.3)
        pdf.set_x(3.2)
        pdf.cell(1,0, 'ARTICULO:', align='L')
        pdf.set_x(4.8)
        pdf.cell(1,0, str(pallobj.articulo_cod), align='L')
        pdf.set_font('Arial',style='',size=10)
        pdf.set_y(4.5)
        pdf.set_x(3.2)
        pdf.multi_cell(6.5,0.5, pallobj.articulo_descripcion, align='L')
        #linea de cierre
        pdf.line(0.5, 6.5, 9.5, 6.5)
        pdf.set_font('Arial',style='',size=8)
        #vencimiento
        barra_vencimiento = Code128Encoder(str(pallobj.articulo_fecha_vencimiento.strftime('%d/%m/%Y')),options={'height':40, 'label_border': 1, 'bottom_border': 5})
        barra_vencimiento.save('%s/%s.png' % (ETIQUETA_DIR, pallobj.articulo_fecha_vencimiento.strftime('%d%m%Y')), bar_width=1)
        pdf.image('%s/%s.png' % (ETIQUETA_DIR, pallobj.articulo_fecha_vencimiento.strftime('%d%m%Y')), x=0.5, y=6.6, type='png')
        pdf.set_y(6.9)
        pdf.set_x(5.6)
        pdf.cell(1,0, 'VENCIMIENTO', align='L')
        #ultima linea de cierre
        pdf.line(0.5, 8.2, 9.5, 8.2)
        #pallet
        barra_pallet = Code128Encoder(str(pallobj.pall_numero),options={'height':65, 'label_border': 1, 'bottom_border': 5, 'show_label': False})
        barra_pallet.save('%s/%s.png' % (ETIQUETA_DIR, pallobj.pall_numero), bar_width=1)
        pdf.image('%s/%s.png' % (ETIQUETA_DIR, pallobj.pall_numero), x=0, y=8.3, type='png', w=10, h=4)


        cups_server = CupsServer(settings.CUPS_ADMIN[0],
                             settings.CUPS_ADMIN[1]
                             )
        cups_server.modo_admin()
        pdf.set_font('Arial',style='',size=7)

        for ib in range(4):
            a = ib + 1
            pdf_temp = copy.deepcopy(pdf)
            pdf_temp.set_y(2.9)
            pdf_temp.set_x(8.5)

            if reimpresion:
                labelinte = 'COPIA %s/4' % a
                pdf_temp.cell(1,0, labelinte, align='R')
            else:
                labelinte = 'ORIGINAL %s/4' % a
                pdf_temp.cell(1,0, labelinte, align='R')

            if not pallobj.pallet_completo_010:
                pdf_temp.set_y(3.2)
                pdf_temp.set_x(8.5)
                pdf_temp.cell(1,0, 'INCOMPLETO', align='R')

            pdf_temp.output('%s/%s_%s.pdf' % (ETIQUETA_DIR, pallobj.pall_numero, a))
            with Image(filename="%s/%s_%s.pdf" % (ETIQUETA_DIR, pallobj.pall_numero, a), resolution=(250,250)) as img:
                img.save(filename="%s/%s_%s.jpg" % (ETIQUETA_DIR, pallobj.pall_numero, a))
            cups_server.imprimir_trabajo('Zebra_TLP2844', "%s/%s_%s.jpg" % (ETIQUETA_DIR, pallobj.pall_numero, a), {})

        pdf.close()
        if reimpresion:
            pallobj.reimpresion_etiquetado_010=True
            pallobj.reimpresion_etiquetado_010_por = usuario
            pallobj.reimpresion_etiquetado_010_fecha = ahora
            pallobj.reimpresion_etiquetado_010_hora = ahora
            pallobj.save()

        pallobj.etiquetado_09=True
        pallobj.etiquetado_09_por = usuario
        pallobj.etiquetado_09_fecha = ahora
        pallobj.etiquetado_09_hora = ahora
        pallobj.save()

def imprimir_etiquetas_cajas(pallobj, articuloobj, usuario):
    ETIQUETA_DIR = '%s/label_files_cajas' % PROJECT_ROOT
    ahora = datetime.datetime.now()
    pdf=FPDF('L','cm',(10, 12.5))
    pdf.add_page()
    pdf.set_font('Arial',style='',size=6)
    pdf.set_y(1)
    pdf.set_x(0.6)
    pdf.cell(1, 0, 'ARTICULO: %s - %s'  % (articuloobj.articulocod, articuloobj.articulo_descripcion), align='L')
    pdf.set_y(1.5)
    pdf.set_x(0.6)
    pdf.cell(1, 0, 'LOTE: %s  UNIDADES: %s'  % (pallobj.articulo_lote, pallobj.articulo_unidades_x_pall), align='L')
    pdf.set_y(1.8)
    pdf.set_x(0.6)
    #linea
    pdf.line(0.5, 2, 11.5, 2)
    #seccion producto
    barra_articulo = Code128Encoder('%s|%s' % (articuloobj.codigo_barra_caja, pallobj.articulo_fecha_vencimiento.strftime('%Y%m%d')), options={'height':60, 'label_border': 1, 'bottom_border': 5})
    barra_articulo.save('%s/%s.png' % (ETIQUETA_DIR, pallobj.articulo_cod), bar_width=1)
    pdf.image('%s/%s.png' % (ETIQUETA_DIR, pallobj.articulo_cod), x=0.8, y=2.1)
    pdf.line(0.5, 4.5, 11.5, 4.5)
    pdf.set_y(4.7)
    pdf.set_x(0.5)
    pdf.cell(1, 0, 'BODEGA: %s  HORA: %s FECHA: %s IMPRESO POR: %s'  % (pallobj.bodega, ahora.strftime('%H:%M:%S'), ahora.strftime('%d/%m/%Y'), usuario), align='L')

    pdf.output('%s/%s_%s.pdf' % (ETIQUETA_DIR, articuloobj.articulocod, pallobj.articulo_fecha_vencimiento.strftime('%Y%m%d')))
    pdf.close()

    cups_server = CupsServer(settings.CUPS_ADMIN[0],
                         settings.CUPS_ADMIN[1]
                         )

    cups_server.modo_admin()
    for a in range(4):

        cups_server.imprimir_trabajo('Zebra_TLP2844', "%s/%s_%s.jpg" % (ETIQUETA_DIR, articuloobj.articulocod, pallobj.articulo_fecha_vencimiento.strftime('%Y%m%d')), {})
