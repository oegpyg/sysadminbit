/**
 * Created by SysadminBitGroup on 8/20/14.
 * Validaciones de interfaz grafica
 */
//added with og 2014-08-24
$.expr[':'].icontains = function(obj, index, meta, stack){
    //method for search modules
    return (obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase().indexOf(meta[3].toLowerCase()) >= 0;
};

modules = false;
$(document).ready(function(){
    //pedro definime como es la url para traer los modulos disponibles
    var l = window.location;
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: l.protocol + '//' + l.host + '/WSmodules/',
        success: function(data){
            modules = data;
        }
    });
    //por ahora cargo a mano modules
    modules = {"Ventas": [
                           ["ItemGroup", "Grupos de Articulo"],
                           ["ItemTaxGroup", "Origen de Articulo"],
                           ["Item", "Articulos"]
                         ],
               "Standard":[
                           ["OurSettings", "Datos de la Empresa"],
                           ["Brand", "Marcas"],
                           ["Manufacturer", "Fabricantes"],
                           ["Account", "Cuentas"],
                           ["CredCardType", "Tipos de Tarjeta de Credito"],
                           ["PayMode", "Formas de Pago"],
                           ["DiscountMap", "Plan de Descuentos"],
                           ["DiscountDeal", "Acuerdos de Descuento"],
                           ["Office", "Sucursales"],
                           ["PayTerm", "Terminos de Pago"],
                           ["GroupCode", "Grupos de Proveedores"],
                           ["Supplier", "Proveedores"],
                           ["VATCode", "Codigos de IVA"],
                           ["Package", "Presentaciones"],
                           ["Unit", "Unidades"],
                           ["BasePriceFormula", "Formulas de Precio Base"],
                           ["AccessGroup", "Grupos de Acceso"],
                           ["User", "Usuarios"]
                          ]
    };
    table = $('table#DataSearch');
        $.each(modules, function( key, module ) {
            $.each(module, function(index, val){
                table.append('<tr class="hide run"><td style="">'+key+'</td><td class="" data-module="'+val[0]+'">'+val[1]+'</td></tr>')
        });
    });
    $('#sb-search-modules').on('focus',function(){
        list = $('table#DataSearch');
        $('#sb-search-modules').on('keyup',function(event){
            event.preventDefault();
            if ($(this).val().length > 3){
                list.find('tr').addClass('hide');
                buscar = $(this).val();
                if(jQuery.trim(buscar) != ''){
                    $("table#DataSearch tr:icontains('" + buscar + "')").removeClass('hide');
                }
            }
            if ($(this).val().length < 3){
                list.find('tr').addClass('hide');
            }
        });
    });

});

function ListWindow(title, module, record){
    var l = window.location;
    var html = '';
    $.ajax({
        type: "GET",
        dataType: 'html',
        url: l.protocol + '//' + l.host + '/'+module+'/load/'+record+'/',
        success: function(data){
            Appwindow(title, data);
            $('#'+record+'List').dataTable({
                "oLanguage": {
                    "sProcessing":     "Procesando...",
                    "sLengthMenu":     "Mostrar _MENU_ registros",
                    "sZeroRecords":    "No se encontraron resultados",
                    "sEmptyTable":     "Ningún dato disponible en esta tabla",
                    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix":    "",
                    "sSearch":         "Buscar:",
                    "sUrl":            "",
                    "sInfoThousands":  ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst":    "Primero ",
                        "sLast":     " Último",
                        "sNext":     " Siguiente",
                        "sPrevious": "Anterior "
                    },
                    "oAria": {
                        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                }
            });
        }
    });
}


function run(title, module, record){
    /*Constructor del Modulo
    * Aqui se debe realizar todas la opciones para la ventana
    * */
    var l = window.location;
    var html = '';
    $.ajax({
        type: "GET",
        dataType: 'html',
        url: l.protocol + '//' + l.host + '/'+module+'/load/'+record+'/',
        success: function(data){
            Appwindow(title, data);
        }
    });
}

function Appwindow(title, content) {
    /*Contruye la ventana a partir de los parametros asignados por run()
    * Manejando una ventana con funciones independientes
    * */
    var div_count = $('.dialog_window').length + 1;
    //generate a unique id based on the total number
    var div_id = 'dialog_window_' + div_count;
    var buttons = new Array();
    if( $('#alertbutton').is(':checked') ) {
        buttons.push({
            text: 'ALERT',
            click: function() {
                alert('ALERTING from Dialog Widnow: ' + title);
            }
        });
    }
    if( $('#closebutton').is(':checked') ) {
        buttons.push({
            text: 'CLOSE',
            click: function() {
                $('#' + div_id).dialog('close');
            }
        });
    }
    //append the dialog window HTML to the body
    $('body').append('<div class="dialog_window" id="' + div_id + '">' + content + '</div>');
    //initialize our new dialog
    var dialog = $('#' + div_id).dialog({
        width: 'auto',
        height: 'auto',
        title : title,
        autoOpen : true,
        buttons: buttons
    });
    $('#dialog_window_'+div_count).find(':input').each(
                function(){
                    var newId = this.id + div_count;
                    $(this).prev().attr('for', newId); // update label for (assume prev sib is label)
                    this.name = this.id = newId; // update id and name (assume the same)
                });
    $('#dialog_window_'+div_count+' #recent-tab li a').each(function(){
        $(this).attr('href', $(this).attr('href')+div_count);
    });
    $('#dialog_window_'+div_count+' div.tab-pane').each(function(){
        var newId = this.id + div_count;
        this.name = this.id = newId;
    });
}
//oef added with og 2014-08-24


    
var SbDashboard  = {
    //ObjectLogic
}

var SbInvoice  = {
    //ObjectLogic
}

var SbImportation  = {
    //ObjectLogic
}

var SbPrinters  = {
    //ObjectLogic
}

