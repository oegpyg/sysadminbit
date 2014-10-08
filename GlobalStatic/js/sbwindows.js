/**
 * Created by SysadminBitGroup on 8/20/14.
 * Validaciones de interfaz grafica
 */
//added with og 2014-08-24
$.expr[':'].icontains = function(obj, index, meta, stack){
    //method for search modules
    return (obj.textContent || obj.innerText || jQuery(obj).text() || '').toLowerCase().indexOf(meta[3].toLowerCase()) >= 0;
};

var DataSearch = {
    'modules': {},
    getModules:function(url){
        $.ajax({
            type: "GET",
            dataType: 'json',
            url: url,
            success: function(data){
                this.modules = data;
            }
        });
    },
    search: function(tables, ele){
        var table = $(tables);
        $.each(this.modules, function( key, module ) {
            $.each(module, function(index, val){
                table.append('<tr class="hide run"><td style="">'+key+'</td><td class="" data-module="'+val[0]+'">'+val[1]+'</td></tr>')
            });
        });
        $(ele).on('focus',function(){
            $(ele).on('keyup',function(event){
                event.preventDefault();
                if ($(this).val().length > 3){
                    table.find('tr').addClass('hide');
                    var buscar = $(this).val();
                    if(jQuery.trim(buscar) != ''){
                        $(tables+" tr:icontains('" + buscar + "')").removeClass('hide');
                    }
                }
                if ($(this).val().length < 3){
                    table.find('tr').addClass('hide');
                }
                if ($(this).val() == '*'){
                    table.find('tr').removeClass('hide');
                }
            });
        });
        $('.run').bind('click', function(){
            this.ListWindow($(this).find('td').eq(1).text(),
                $(this).find('td').eq(0).text(),
                $(this).find('td').eq(1).attr('data-module')
            );
        });
    },
    //ListWindow: function(title, module, record){
    ListWindow: function(title, url, module_name, method_name, class_name){
        //sujeto a cambios solo es una maqueta
        var html = '';
        $.ajax({
            type: "GET",
            dataType: 'html',
            //url: l.protocol + '//' + l.host + '/'+module+'/load/'+record+'/',
            url: url + module_name + '/' + method_name + '/' + class_name,
            success: function(data){
                DataSearch.Appwindow(title, data);
                $('#'+class_name+'List').dataTable({
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
    },
    Appwindow: function(title, content) {
        /*Contruye la ventana a partir de los parametros asignados por ListWindow()
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
};
$(document).ready(function(){
    DataSearch.modules = {"Ventas": [
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
    DataSearch.search('table#DataSearch','#sb-search-modules');

});

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

