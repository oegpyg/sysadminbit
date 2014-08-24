var gusuo = null;
//control de intervalos
var lintg = null;

var utils = {
    producto_ac: function() {
        datosf = JSON.parse(localStorage.getItem('datos'));
        $( "input[name=artcod]").keyup(function() {
            if (datosf.articulos[$( "input[name=artcod]").val()] ) {
                $('#deta_proa').html('<tr>' +
                    '<td>' + datosf.articulos[$( "input[name=artcod]").val()].descripcion + '</td>'+
                    '<td>' + datosf.articulos[$( "input[name=artcod]").val()].unidades_caja +'</td>'+
                    '<td>' + datosf.articulos[$( "input[name=artcod]").val()].multiplo_venta +'</td>'+
                    '</tr>');
            }

            if (datosf.articulosn[$( "input[name=artcod]").val()]) {
                $('#deta_proa').html('<tr>' +
                    '<td>' + datosf.articulosn[$( "input[name=artcod]").val()].descripcion + '</td>'+
                    '<td>' + datosf.articulosn[$( "input[name=artcod]").val()].unidades_caja +'</td>'+
                    '<td>' + datosf.articulosn[$( "input[name=artcod]").val()].multiplo_venta +'</td>'+
                    '</tr>');
            }
        });
    },
     informando: function(parametros){
         $.get('/sman/informando',
             parametros,
             function(response) {
                 null;
             },
             'json'
         );
     },
     spaceout: function(){
         $("input#clieoca").on({
             keydown: function(e) {
                 if (e.which === 32)
                     return false;
             },
             change: function() {
                 this.value = this.value.replace(/\s/g, "");
                 this.value = this.value.toUpperCase();
             }
         });
     }
}

var hacer_tables = {
    bt_tables: function(id_tabla){
        $.extend($.tablesorter.themes.bootstrap, {
                        // these classes are added to the table. To see other table classes available,
                        // look here: http://twitter.github.com/bootstrap/base-css.html#tables
                        table      : 'table table-bordered',
                        caption    : 'caption',
                        header     : 'bootstrap-header', // give the header a gradient background
                        footerRow  : '',
                        footerCells: '',
                        icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
                        sortNone   : 'bootstrap-icon-unsorted',
                        sortAsc    : 'icon-chevron-up glyphicon glyphicon-chevron-up',
                        sortDesc   : 'icon-chevron-down glyphicon glyphicon-chevron-down',
                        active     : '', // applied when column is sorted
                        hover      : '', // use custom css here - bootstrap class may not override it
                        filterRow  : '', // filter row class
                        even       : '', // odd row zebra striping
                        odd        : ''  // even row zebra striping
        });

        $(id_tabla).tablesorter(
                {
                    // this will apply the bootstrap theme if "uitheme" widget is included
                    // the widgetOptions.uitheme is no longer required to be set
                    theme : "bootstrap",
                    widthFixed: true,
                    headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!
                    // widget code contained in the jquery.tablesorter.widgets.js file
                    // use the zebra stripe widget if you plan on hiding any rows (filter widget)
                    widgets : [ "uitheme", "filter", "zebra" ],
                    widgetOptions : {
                      // using the default zebra striping class name, so it actually isn't included in the theme variable above
                      // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
                      zebra : ["even", "odd"],
                      // reset filters button
                      filter_reset : ".reset"
                      // set the uitheme widget to use the bootstrap theme class names
                      // this is no longer required, if theme is set
                      // ,uitheme : "bootstrap"
                    }
                }
        ).tablesorterPager({
        // target the pager markup - see the HTML block below
        container: $(".ts-pager"),
        // target the pager page select dropdown - choose a page
        cssGoto  : ".pagenum",
        // remove rows from the table to speed up the sort of large tables.
        // setting this to false, only hides the non-visible rows; needed if you plan to add/remove rows with the pager enabled.
        removeRows: false,
        // output string - default is '{page}/{totalPages}';
        // possible variables: {page}, {totalPages}, {filteredPages}, {startRow}, {endRow}, {filteredRows} and {totalRows}
        output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'
                });
    },
    big_tables: function(id_tabla){
        $.extend($.tablesorter.themes.bootstrap, {
                        // these classes are added to the table. To see other table classes available,
                        // look here: http://twitter.github.com/bootstrap/base-css.html#tables
                        table      : 'table table-bordered',
                        header     : 'bootstrap-header', // give the header a gradient background
                        footerRow  : '',
                        footerCells: '',
                        icons      : '', // add "icon-white" to make them white; this icon class is added to the <i> in the header
                        sortNone   : 'bootstrap-icon-unsorted',
                        sortAsc    : 'icon-chevron-up',
                        sortDesc   : 'icon-chevron-down',
                        active     : '', // applied when column is sorted
                        hover      : '', // use custom css here - bootstrap class may not override it
                        filterRow  : '', // filter row class
                        even       : '', // odd row zebra striping
                        odd        : ''  // even row zebra striping
        });

        $(id_tabla).tablesorter(
                {
                    // this will apply the bootstrap theme if "uitheme" widget is included
                    // the widgetOptions.uitheme is no longer required to be set
                    theme : "bootstrap",
                    widthFixed: true,
                    headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!
                    // widget code contained in the jquery.tablesorter.widgets.js file
                    // use the zebra stripe widget if you plan on hiding any rows (filter widget)
                    widgets : [ "uitheme", "filter", "zebra"],
                    widgetOptions : {
//                        scroller_height : 300,
//                        scroller_barWidth : 25,
//                        scroller_jumpToHeader: true,
//                        scroller_idPrefix : 's_',
                      // using the default zebra striping class name, so it actually isn't included in the theme variable above
                      // this is ONLY needed for bootstrap theming if you are using the filter widget, because rows are hidden
                      zebra : ["even", "odd"],
                      // reset filters button
                      filter_reset : ".reset"
                      // set the uitheme widget to use the bootstrap theme class names
                      // this is no longer required, if theme is set
                      // ,uitheme : "bootstrap"

                    }
                }
        );
    },
    big_tables_jui: function(id_tabla) {
        $(id_tabla).tablesorter({
            theme: 'jui',
            widthFixed : true,
            showProcessing: true,
            headerTemplate : '{content} {icon}',
            widgets: [ 'uitheme', 'zebra', 'filter'],
            widgetOptions : {
                uitheme: 'jui',
                zebra: [
                    "ui-widget-content even",
                    "ui-state-default odd"]
            }
        });
    },
    big_tables_theme: function(id_tabla, theme) {
        $(id_tabla).tablesorter({
            theme: theme,
            widthFixed : true,
            showProcessing: true,
            headerTemplate : '{content} {icon}',
            widgets: [ 'uitheme', 'zebra', 'filter', 'scroller' ],
            widgetOptions : {
                scroller_height : 1024,
                scroller_barWidth : 17,
                scroller_jumpToHeader: true,
                scroller_idPrefix : 's_'
            }
        });
    },
    big_tables_theme_ws: function(id_tabla, theme) {
        $(id_tabla).tablesorter({
            theme: theme,
            widthFixed : true,
            showProcessing: true,
            headerTemplate : '{content} {icon}',
            widgets: [ 'uitheme', 'zebra', 'filter']
        });
    }
}




var control_ui = {
    deshabilitar_botones: function(clase){
        $(clase).prop('disabled', true);
    },
    habilitar_botones: function(clase){
        $(clase).prop('disabled', false);
    }

}

//pgh=prodcutos al aire
//pgl=productos por categoria


var esperar = {
    animated: function(bar){
        var progress = setInterval(function() {
            if (bar.width()==400) {
                clearInterval(progress);
                $('.progress').removeClass('active');
            } else {
                bar.width(bar.width()+40);
            }
            bar.text(bar.width()/4 + "%");
        }, 800);
        return progress;
    },
    definir: function(){
        bar ='<br><br><br><br><br><br><div class="container" style="text-align: center";>'
            +'<div class="progress progress-striped active">'
            +'<div class="bar" style="width: 100%;">GENERANDO...</div>'
            +'</div>'
            +'</div>'
        return bar;
    },
    procesando: function(){
        bar = $('<div class="modal hide pro_dia" data-backdrop="static" data-keyboard="false">'
        +'<div class="modal-header">'
        +'    <h1>PROCESANDO...</h1>'
        +'</div>'
        +'<div class="modal-body">'
        +    '<div class="progress progress-striped active">'
        +        '<div class="bar" style="width: 100%;"></div>'
        +    '</div>'
        +'</div>'
        +'</div>');

        return bar;
    },
    mostrar_dialogo: function(){
        bar = this.procesando();
        bar.modal();
    },
    cerrar_dialogo: function(){
        $('.pro_dia').modal('hide');
    },
    cubrir: function(ele) {
        $('<div id=cubrir_ov><pre style="padding-top: 60px;"><h1>POR FAVOR ESPERE</h1></pre></div>')
            .css({
                position:"fixed", // ze trick
                background:"#000 url('/static/dist/img/gears.gif') no-repeat fixed center",
                opacity:.5,
                top:0,
                bottom: 0,
                left:0,
                right: 0,
                'text-align': 'center',
                'text-size': 60,
                'text-color': 'RED',
                zIndex: 4999 // everything you want on top, gets higher z-index
            }).appendTo(ele);
    },

    descubrir: function(){
        $('#cubrir_ov').remove();
    },

    descubrir_especifico: function(){
        $('.cubrir_ov').remove();
    },

    cubrir_especifico: function (ele) {
        $(ele).html('<div class=cubrir_ov><pre style="padding-top: 60px;"><h1>POR FAVOR ESPERE</h1></pre></div>');
        $('.cubrir_ov').css({
                background:"#000 url('/static/dist/img/gears.gif') no-repeat fixed center",
                opacity:.5,
                height: 'auto',
                width: 'auto',
                'text-align': 'center',
                'text-size': 60,
                'text-color': 'RED',
                zIndex: 4999 // everything you want on top, gets higher z-index
        })
    }
}

var mensajes = {
    ini_aba: function() {
        Messenger.options = {
            extraClasses: 'messenger-fixed messenger-on-bottom',
            theme: 'future'
        }
    },
    ini_arri: function() {
        Messenger.options = {
            extraClasses: 'messenger-fixed messenger-on-top',
            theme: 'future'
        }
    },

    error: function(mensaje){
        Messenger().post({
            message: mensaje,
            type: 'error',
            showCloseButton: true,
            hideAfter: 15,
            hideOnNavigate: true
        });
    },
    exitos: function(mensaje) {
        Messenger().post({message:mensaje,
            hideAfter: 15,
            hideOnNavigate: true,
            showCloseButton: true
        });
    }
}

var impresiones = {
    inicializar: function(id){
        $(id).modal('show');
    },
    tabla_elegante: function(id) {
        hacer_tables.bt_tables(id);
    },
    autodestruccion: function(id){
        $(id).on('hidden', function(){
            $("#impre_parametros").remove();
            $('#imprimir_ac').off();
            $('#imprimir_ac').remove();
            $(id).remove();
        });

    },
    weasy_print: function(url, url_fetch) {
        parametros = {
            html2imp: true,
            url_fetch: url_fetch
        }
        esperar.Wait('body');
        $.get(url, parametros, function(response){
                if (response.exitos) {
                    $.each(response.exitos, function(i, val){
                        mensajes.exitos(val);
                    });

                }
                if (response.error) {
                    $.each(response.error, function(i, val){
                        mensajes.exitos(val);
                    });
                }
            esperar.Unwait();
         }, 'json' );
    }
}

var dialogos = {
    formulario_m: function(idm, urlm, parametros){
        var $modal = $('<div id="'+idm+'" class="modal container hide fade" tabindex="-1" data-backdrop="static" data-keyboard="false"></div>');
        $('body').modalmanager('loading');
        $modal.load(urlm, parametros, function(){
                    $modal.modal();
                });
    },
    bloqueo: function(cab, men) {
        var $modal = $('<div id="full-width" class="modal container hide fade" tabindex="-1"  data-backdrop="static" data-keyboard="false">'+
            '<div class="modal-header">'+
                '<h3>'+cab+'</h3>'+
            '</div>'+
            '<div class="modal-body">'+
                '<p>'+men+'</p>'+
            '</div>'+
            '<div class="modal-footer">'+
                '<button type="button" onclick="window.location = \'/salir\';" class="btn btn-large btn-danger">SALIR</button>'+
            '</div>'+
        '</div>');
        $('body').modalmanager('loading');
        $modal.modal();
    },
    formulario_factura: function(idm, urlm, parametros){
        var $modal = $('<div id="'+idm+'" class="modal container hide fade" tabindex="-1"></div>');
        $('body').modalmanager('loading');
        $modal.load(urlm, parametros, function(){
                    $modal.modal();
                });
    },
    anulacion_item: function(pedidopk, url){
        var $modal = $('<div class="modal hide fade">'+
              '<div class="modal-header">'+
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button>'+
                '<h3>ANULACION DE ITEM</h3>'+
              '</div>'+
              '<div class="modal-body">'+
                '<p></p>'+
              '</div>'+
              '<div class="modal-footer">'+
                '<a href="#" class="btn">Close</a>'+
                '<a href="#" class="btn btn-primary">Save changes</a>'+
              '</div>'+
            '</div>'
        );
        $('body').modalmanager('loading');
        $modal.modal();
        $('.modal-footer').html('<button class="btn btn-large btn-danger" data-dismiss="modal" type="button" onclick="pedidos.rechazar_pedido(\''+pedidopk+'\',\''+url+'\',\''+$('#motivo_rechazo').val()+'\')" >CONFIRMAR</button>');
    },
    entregado_pedido: function(pedidopk, url){
        var $modal = $('<div id="full-width" class="modal container hide fade" tabindex="-1">'+
            '<div class="modal-header">'+
                '<h3> SE VA A ENTREGAR UN PEDIDO</h3>'+
            '</div>'+
            '<div class="modal-body">'+
                '<p>AGUARDAMOS SU CONFIRMACION</p>'+
            '</div>'+
            '<div class="modal-footer">'+
                '<button type="button" data-dismiss="modal" onclick="pedidos.entregado_pedido(\''+pedidopk+'\',\''+url+'\')" class="btn btn-large btn-danger">CONFIRMAR</button>'+
            '</div>'+
        '</div>');
        $('body').modalmanager('loading');
        $modal.modal();
    },

    detalle_pedido: function(cuentapk, urlm){
        var $modal = $('<div id="'+cuentapk+'_cuentapk" class="modal container hide fade" tabindex="-1"></div>');
        $('body').modalmanager('loading');
        $modal.load(urlm, 'listar=true&cuentapk='+cuentapk, function(){
                    $modal.modal();
                });
    },
    calculo_pom: function(pedidopk, url) {
        var $modal = $('<div id="full-width" class="modal container hide fade" tabindex="-1">'+
            '<div class="modal-header">'+
                '<h3>VA A QUITAR PRODUCTOS DE ESTA BODEGA</h3>'+
            '</div>'+
            '<div class="modal-body">'+
                '<p>ESTA SEGURO ?</p>'+
            '</div>'+
            '<div class="modal-footer">'+
                '<button type="button" data-dismiss="modal" onclick="pedidos.calculo_pom(\''+pedidopk+'\',\''+url+'\')" class="btn btn-large btn-danger">CONFIRMAR</button>'+
            '</div>'+
        '</div>');
        $('body').modalmanager('loading');
        $modal.modal();

    },
    cerrar_dialogos: function() {
        $('.modal').modal('hide');
    }
}

var notificaciones =  {
    norma: function (){
        noti0 = $('<div class="alert alert-block alert-danger fade in">'+
                     '<button type="button" class="close" data-dismiss="alert">X</button>'+
                      '<h4 class="alert-heading">AREA DE NOTIFICACIONES</h4>'+
                      '<p>MENSAJES GENERALES PARA EL USUARIO</p>'+
                      '<p>'+
                        '<a class="btn btn-large btn-danger btn-block" href="#">ACCION</a> ' +
                        '<a class="btn btn-large btn-warning btn-block" href="#">ACCION</a>'+
                      '</p>'+
                   '</div>');
        $('#notificaciones').html(noti0);
    },
    mensajes_ac: function(mensaje) {
         noti0 = $('<div class="alert alert-block alert-info fade in">'+
                     '<button type="button" class="close" data-dismiss="alert">X</button>'+
                      '<h4 class="alert-heading">NOTA</h4>'+
                      '<p>'+mensaje+'</p>'+
                   '</div>');
        $('#notificaciones').append(noti0);
    },
    mensajes_ae: function(mensaje) {
         noti0 = $('<div class="alert alert-block alert-danger fade in">'+
                     '<button type="button" class="close" data-dismiss="alert">X</button>'+
                      '<h4 class="alert-heading">NOTA</h4>'+
                      '<p>'+mensaje+'</p>'+
                   '</div>');
        $('#notificaciones').append(noti0);
    },
    borrado_t: function(){
        setTimeout(function(){
            $('#notificaciones').html('');
        },15000);
    },
    noti_popup: function(titulo, contenido){
        if (contenido.trim() != '') {
            $('.notif').popover('destroy');
            $('.notif').popover({
                placement: 'bottom',
                html: true,
                title: titulo,
                content: contenido
            });
            $('.notif').popover('show');
        }
    },

    noti_popu_faster: function(titulo, contenido, tipo) {
        if (contenido.trim() != '') {
            html = '<div class="alert alert-block alert-'+ tipo +' fade in">' +
                '<h4 class="alert-heading">'+ titulo +'</h4>' +
                '<p>'+ contenido +'</p>' +
                '</div>';

            $('.notif').popover('destroy');
            $('.notif').popover({
                placement: 'bottom',
                html: true,
                title: titulo,
                content: html
            });
            $('.notif').popover('show');
        }

    }

}

sepsa_fcontrol = {
    listar: function(url, parametros) {
        esperar.mostrar_dialogo();
        $.get(url, parametros, function(response){
//            $('#ped_lis_b').html(response);
            $('#f_tab').html(response);
            $("#ped_det_b").html('');
            esperar.cerrar_dialogo();
        }, 'html' );
    },

    listar_errores: function(url, parametros) {
        esperar.mostrar_dialogo();
        $.get(url, parametros, function(response){
            $(response).modal({
                show: true
            });
            setTimeout(function(){
                $('.editables_sepe').editable({
                    mode: 'inline',
                ajaxOptions: {
                    dataType: 'json'
                },
                success: function(response) {
                    mensajes.ini_arri();
                    if (response.exitos) {
                        mensajes.exitos(response.exitos);
                        $(this).parent().next().html('<span class="label label-info">ARREGLADO</span>');
                        trp = $(this).parent().prev().prev().prev();
                        trp.html('<span class="label label-info">'+ response.lista +'</span>');
                        trp = trp.prev();
                        trp.html('<span class="label label-info">'+ response.preciou +'</span>');
                        trp = trp.prev();
                        trp.html('<span class="label label-info">'+ response.preciou +'</span>');
                        $(this).parent().html(response.cantidad);
                    }
                    if (response.error) {
                        $.each(response.error, function(i, val){
                            mensajes.error(val);
                        });
                    }
                }
            });
            },1000 );
            esperar.cerrar_dialogo();
        }, 'html' );
    },

    listar_sugeridos: function(url, parametros){
        $.get(url, parametros, function(response){
            $('#tb_sg').html(response);
        }, 'html');
    },

    inactivar: function(url, parametros, elemento){
        esperar.mostrar_dialogo();
        $.post(url, parametros, function(response){
            mensajes.ini_arri();
            if (response.exitos) {
                notificaciones.noti_popu_faster('', response.exitos, 'info');
                notificaciones.noti_popu_faster('', response.gen_res.men, 'info');
//                $(elemento).parent().hide();
//                $(elemento).parent().parent().hide();
                sepsa_fcontrol.mostrar_detalle("/sman/sepsa_files/",
                            $('tr[data-sepsa-archivo="'+ response.sepsa_archivo +'"]').children().eq(0),
                            nocoll=true
                    );
            }
            if (response.error) {
                mensajes.error(response.error);
            }
            esperar.cerrar_dialogo();
        }, 'json' );
    },
    up_precios: function(url, parametros, elemento){
        esperar.mostrar_dialogo();
        $.post(url, parametros, function(response){
            mensajes.ini_arri();
            if (response.exitos) {
                notificaciones.noti_popu_faster('', response.exitos, 'info');
                notificaciones.noti_popu_faster('', response.gen_res.men, 'info');
                sepsa_fcontrol.mostrar_detalle("/sman/sepsa_files/",
                            $('tr[data-sepsa-archivo="'+ response.sepsa_archivo +'"]').children().eq(0),
                            nocoll=true
                    );
            }
            if (response.error) {
                mensajes.error(response.error);
            }
            esperar.cerrar_dialogo();
        }, 'json' );
    },
    generar: function(url, parametros){
        esperar.mostrar_dialogo();
        $.get(url, parametros, function(response){
            mensajes.ini_arri();
            if (response.exitos) {
                mensajes.exitos(response.exitos);
                sepsa_fcontrol.listar('/sman/sepsa_files', 'listar=true&sepsa_error=true');
                $("input[name=radioc]").prop('checked', false);
            }
            if (response.error) {
                mensajes.error(response.error);
            }
            esperar.cerrar_dialogo();
        }, 'json' );
    },
    anular: function(url, parametros){
        esperar.mostrar_dialogo();
        $.get(url, parametros, function(response){
            mensajes.ini_arri();
            if (response.exitos) {
                mensajes.exitos(response.exitos);
                sepsa_fcontrol.listar('/sman/sepsa_files', 'listar=true&sepsa_error=true');
                $("input[name=radioc]").prop('checked', false);
            }
            if (response.error) {
                mensajes.error(response.error);
            }
            esperar.cerrar_dialogo();
        }, 'json' );
    },
    artmore: function(url, parametros, elemento){
        $.post(url, parametros, function(response){
            if (response.exitos) {
                notificaciones.noti_popu_faster('.', response.exitos, 'info');
                notificaciones.noti_popu_faster('', response.gen_res.men, 'info');
                sepsa_fcontrol.mostrar_detalle("/sman/sepsa_files/",
                            $('tr[data-sepsa-archivo="'+ response.sepsa_archivo +'"]').children().eq(0),
                            nocoll=true
                    );
            }
            if (response.error) {
                    nhtml = '';
                    $.each(response.error, function(i, val){
                        nhtml += mensajes.error(val);
                    });
                    notificaciones.noti_popu_faster('.',
                            response.exitos, 'danger');
            }
        }, 'json');
    },
    sugeridos: function(url){
        $.get(url, {
            sepsa_sugeridos: true
        }, function(response) {
            $("#central_content").html(response);
        }, 'html');

    },
    mostrar_detalle: function(url, elemento, nocoll) {
        if (nocoll===undefined) {
            $("#collapseped_link").click();
        }

        elet = $(elemento).parent();
        $.get(url,
            {
                mostrar_detalle: true,
                sepsa_archivo: elet.attr('data-sepsa-archivo'),
                nro_documento: elet.attr('data-nro_documento'),
                cliente_cod_suc: elet.attr('data-cliente-cod-suc'),
                circuito_cod: elet.attr('data-circuito-cod')
            },
            function(response) {
                $('#ped_det_b').html(response);

            },
            'html'
        );

        $.get('/sman/ctacte/',
                    {
                        con_ctacte: true,
                        cliente_cod: elet.attr('data-cliente-cod'),
                        cliente_suc: elet.attr('data-cliente-suc')
                    },
                    function(response) {
                        $('#catcte_cli').html(response);
                    },
                    'html'
                );
        $('.number').number(true);



    },
    borrar_sugerido: function (sg_pk, url) {
        $.get(url, {sg_pk: sg_pk, borrar_sugerido: true}, function(response) {
            sepsa_fcontrol.listar_sugeridos(
                            "/sman/sepsa_files/",
                            { listar: true,
                                sugeridos: true,
                                cliente_cod_suc: response.cliente_cod_suc,
                                rango: true,
                                fecha: $('#id_fecha').val()
                            }
                    );

            notificaciones.noti_popu_faster('EXITOS', response.mensaje, 'info');

        }, 'json');
    }
}

pedidos_control = {
    traer_marcados: function(query){
      m_pedidos = [ ];
        $.each($(query), function(i, val){
            if ($(this).prop('checked') == true ) {
                m_pedidos.push({
                    name: 'pedido_numero',
                    value: $(this).parent().parent().attr('data-pedido-numero')
                });
                m_pedidos.push({
                    name: 'articulo_cod',
                    value: $(this).parent().parent().attr('data-pedido-articulo')
                });
                m_pedidos.push({
                    name: 'pk',
                    value: $(this).parent().parent().attr('data-pedido-pk')
                });
                m_pedidos.push({
                    name: 'formulacion',
                    value: $(this).parent().parent().attr('data-pedido-formulacion')
                });
            }
        });
        return m_pedidos
    },

    mostrar_detalle: function(url, elemento, parametro, nocoll){
//        $("#collapseallped").collapse('hide');
        if (nocoll !== false) {
//            $(".tab_t0").removeClass('in');
//            $(".tab_t0").addClass('in');
            $(".tab_t1").click();
        }
        esperar.WaitInElement('#ped_det_b');
        esperar.WaitInElement('#catcte_cli');

        elet = $(elemento);
        $.get(url,
            {
                tipo_detalle: parametro,
                mostrar_detalle: true,
                pedido_numero: elet.attr('data-pedido-numero'),
                cliente_ruc: elet.attr('data-cliente-ruc'),
                cliente_cod: elet.attr('data-cliente-cod'),
                cliente_suc: elet.attr('data-cliente-suc'),
                cliente_cod_suc: elet.attr('data-cliente-cod-suc'),
                circuito_cod: elet.attr('data-circuito-cod')
            },
            function(response) {
                if (parametro === 'bloque') {
                    $('#bloque_distribucion').html(response);
                }
                else {
                  $('#ped_det_b').html(response);
                }


            },
            'html'
        );

        $.get('/sman/ctacte/',
            {
                con_ctacte: true,
                cliente_cod: elet.attr('data-cliente-cod'),
                cliente_suc: elet.attr('data-cliente-suc')
            },
            function(response) {


                $('#catcte_cli').html(response);

            },
            'html'
        );
        $('#notificaciones').html('');
        notificaciones.mensajes_ae('<span class="label label-info">CLIENTE:</span>' + elet.attr('data-cliente-cod') +
                                   '<span class="label label-info">ESTADO:</span>'+ elet.attr('data-ctacte-estado') +
                                   '<span class="label label-info">MOTIVO:</span>'+ elet.attr('data-ctacte-motivo') +
                                   '<span class="label label-info ">SALDO:</span><span class="number">'+ elet.attr('data-ctacte-saldo') + '</span>'
        );

        $('.number').number(true);

    },
    listar: function(url, parametros, para_bloques) {
        esperar.Wait('body');
        parametros = parametros +'&fecha_i=' + $('#fecha_inicio_f').val() + '&fecha_f=' + $('#fecha_fin_f').val();
        $.get(url, parametros, function(response){
            if (para_bloques) {
                $('#pedidos_lista').remove();
                $('#bloque_list').html('<div id="pedidos_control"></div>');
                $('#bloque_list').append(response);
            }
            else {
                $('#f_tab').html(response);
                $("#ped_det_b").html('');
            }

            esperar.Unwait();

        }, 'html' );
    },

    listar_mix: function(url, parametros, titulo) {
        esperar.WaitInElement('#panel-generico-body');
        $.get(url, parametros, function(response){
            $('#panel-generico-titulo').html(titulo);
            $('#panel-generico-body').html(response);
            $('#panel-generico').show();
            ui_control.hasta_pos('#panel-generico-body');
        }, 'html' );
    },

    listar_pedidos_en_box: function(url, box_numero, bloque_cod) {
        parametros = {
            listar_pedidos: true,
            en_box: true,
            box_numero: box_numero,
            bloque_cod: bloque_cod
        }
        esperar.WaitInElement('#panel-generico-body');
        $.get(url, parametros, function(response){
            $('#panel-generico-titulo').html('PEDIDOS EN EL BOX '+ box_numero+' PARA EL BLOQUE '+ bloque_cod);
            $('#panel-generico-body').html(response);
            $('#panel-generico').show();
            ui_control.hasta_pos('#panel-generico-body');
        }, 'html' );
    },

    listar_pedidos_en_reparto: function(url, reparto_numero, bloque_cod) {
        parametros = {
            listar_pedidos: true,
            en_reparto: true,
            reparto_numero: reparto_numero,
            bloque_cod: bloque_cod
        }
        $('#panel-reparto-pedidos').show();
        esperar.WaitInElement('#panel-reparto-pedidos-body');
        $.get(url, parametros, function(response){
            $('#panel-reparto-pedidos-titulo').html('PEDIDOS EN EL REPARTO '+ reparto_numero +' PARA EL BLOQUE '+ bloque_cod);
            $('#panel-reparto-pedidos-body').html(response);
        }, 'html' );
    },


    listar_pedidos_bloque_problemas: function(url, bloque_cod) {
        parametros = {
            listar_pedidos: true,
            bloque_problemas: true,
            bloque_cod: bloque_cod
        }
        $('#panel-pedidos-problemas').show();
        esperar.WaitInElement('#panel-pedidos-problemas-body');
        $.get(url, parametros, function(response){
            $('#panel-pedidos-problemas-titulo').html('PROCESO DE BORRADO DEL BLOQUE '+ bloque_cod);
            $('#panel-pedidos-problemas-body').html(response);

            ui_control.hasta_pos('#panel-pedidos-problemas');
        }, 'html' );
    },

    mostrar_detalle_pedido_problemas: function(url, pedido_numero, bloque_cod) {
        parametros = {
            mostrar_detalle_pedido_problemas: true,
            pedido_numero: pedido_numero,
            bloque_cod: bloque_cod
        }
        pedele = $('#pedido_numero_'+pedido_numero);
        esperar.WaitInElement(pedele.next().children());
        $.get(url, parametros, function(response){
            pedele.next().children().html(response);
        }, 'html' );
    },

    mostrar_detalle_pedido_reparto: function(url, pedido_numero, bloque_cod, reparto_numero) {
        parametros = {
            mostrar_detalle_pedido_reparto: true,
            pedido_numero: pedido_numero,
            bloque_cod: bloque_cod,
            reparto_numero: reparto_numero
        }
        pedele = $('#pedido_numero_'+pedido_numero);
        esperar.WaitInElement(pedele.next().children());
        $.get(url, parametros, function(response){
            pedele.next().children().html(response);
        }, 'html' );
    },

    listint: function(interval, url){
        lintg = setInterval(function(){
            $('#lped_entrantes').click();
            mensajes.ini_arri();
            mensajes.exitos('LISTA DE PEDIDOS ACTUALIZADA');
        }, interval);
    },
    kill_lintg: function(){
        clearInterval(lintg);
    },

    alert_gen: function(interval, url, parametros){
        setInterval(function(){
            pedidos_control.ped_can_gen(url, parametros);
            $("input[name=radioc]").prop('checked', false);
        }, interval);
    },
    ped_can_gen: function(url, parametros){
        //cantidad de pedidos en estado aprobado
        mensajes.ini_arri();
        $.get(url, parametros, function(response){
            if (response.exitos) {
                mensajes.exitos(response.exitos);
                $('#notificaciones').html('');
                notificaciones.mensajes_ac(
                    response.exitos
                );
            }
            if (response.error) {
                null;
            }
        }, 'json' );
    },
    listar_anulados: function(url) {
        esperar.mostrar_dialogo();
        $.get(url, {'listar_pedidos_anulados': true}, function(response){
            $('#ped_lis_b').html(response);
            $("#ped_det_b").html('');
            esperar.cerrar_dialogo();
        }, 'html' );
    },

    listar_aprobados: function(url) {
        esperar.mostrar_dialogo();
        $.get(url, {'listar_pedidos_aprobados': true}, function(response){
            $('#ped_lis_b').html(response);
            $("#ped_det_b").html('');
            esperar.cerrar_dialogo();
        }, 'html' );
    },

    listar_procesados: function(url) {
        esperar.mostrar_dialogo();
        $.get(url, {'listar_pedidos_procesados': true}, function(response){
            $('#ped_lis_b').html(response);
            $("#ped_det_b").html('');
            esperar.cerrar_dialogo();
        }, 'html' );
    },

    borrar_item_bloque_problemas: function(url, pedido_numero, bloque_cod){
        bootbox.confirm('<pre>ESTA SEGURO</pre>', function(result) {
                if (result) {
                    parametros = [
                        { name: 'borrar_item_bloque_problemas', value: true },
                        { name: 'motivo', value: 'SIN_MERCADERIA_SUFICIENTE' }
                    ];

                    pedidos_pk = ui_control.traer_marcados_generic('input[name=chpro_list_pedidos_pro_'+ pedido_numero +']',
                                                                [['pedidos_pk', 'data-pedido_pk']]
                                                                );
                    if (pedidos_pk.length === 0) {
                        notificaciones.noti_popu_faster('ERROR',
                            'DEBE SELECCIONAR AL MENOS UN ARTICULO',
                            'danger');
                        return
                    }
                    Array.prototype.push.apply(parametros, pedidos_pk);

                    $.post(url, parametros,
                        function(response){
                            if (response.exitos) {
                                pedidos_control.listar_pedidos_bloque_problemas('/sman/administrador_ventas', bloque_cod);
                                setTimeout(function(){
                                    pedidos_control.mostrar_detalle_pedido_problemas(url, pedido_numero, bloque_cod);
                                    warehouse_control.limpiar_bloque_problemas('/ware_house/generar_bloque/', bloque_cod);
                                }, 3000);
                            }
                            if (response.error) {
                                notificaciones.noti_popu_faster('ERROR', response.error, 'danger');
                            }
                            esperar.cerrar_dialogo();
                        }, 'json');
                }
        });
    },
    pedidos_requerimientos: function(url, pedido_numero, bloque_cod){
        bootbox.confirm('<pre>ESTA SEGURO</pre>', function(result) {
                if (result) {
                    mensajes.ini_arri();
                    parametros = [
                        { name: 'pedidos_requerimientos', value: true }
                    ];

                    pedidos_pk = ui_control.traer_marcados_generic('input[name=chpro_list_pedidos_pro_'+ pedido_numero +']',
                                                                [['pedidos_pk', 'data-pedido_pk']]
                                                                );
                    if (pedidos_pk.length === 0) {
                        notificaciones.noti_popu_faster('ERROR',
                            'DEBE SELECCIONAR AL MENOS UN ARTICULO',
                            'danger');
                        return
                    }
                    Array.prototype.push.apply(parametros, pedidos_pk);

                    $.post(url, parametros,
                        function(response){
                            if (response.exitos) {
                                pedidos_control.listar_pedidos_bloque_problemas('/sman/administrador_ventas', bloque_cod);
                                setTimeout(function(){
                                    pedidos_control.mostrar_detalle_pedido_problemas('/sman/administrador_ventas', pedido_numero, bloque_cod);
                                    warehouse_control.limpiar_bloque_problemas('/ware_house/generar_bloque/', bloque_cod);
                                }, 3000);
                            }
                            if (response.error) {
                                $.each(response.error, function(i, val){
                                   mensajes.error(val);
                                });
                            }
                            esperar.cerrar_dialogo();
                        }, 'json');
                }
        });
    },

    borraritem: function(pk, formulacion, pedido_numero, cliente_ruc, cliente_cod, cliente_suc, cliente_cod_suc, circuito_cod) {
        bootbox.confirm('ESTA SEGURO ???', function(result) {
                if (result) {
                    esperar.mostrar_dialogo();
                    $.post("/sman/administrador_ventas/", {
                            pk: pk,
                            formulacion: formulacion,
                            pedido_numero: pedido_numero,
                            borraritem: true,
                            motivo: $('#'+pk+'_an_motivos').val()
                        },
                        function(response){
                            if (response.exitos) {
                                notificaciones.noti_popu_faster('EXITOS', response.exitos, 'info');
                                pedidos_control.mostrar_detalle('/sman/administrador_ventas/',
                                    $('tr[data-pedido-numero='+ pedido_numero +']'),
                                    'verificar', false
                                );

                                if (response.formulacion) {
                                    $('#lped_entrantes').click();
                                    setTimeout(
                                        function(){
                                            $('#colmenuped').find('.accordion-heading a').eq(0).click();
                                        }, 300
                                    );
                                }
                            }
                            if (response.error) {
                                notificaciones.noti_popu_faster('ERROR', response.error, 'danger');
                            }
                            esperar.cerrar_dialogo();

                        }, 'json');
                }
        });
    },
    anular_pedido: function(url, parametros, lt, options){
        bootbox.confirm('<span class="label label-danger">ESTA SEGURO ??</span>',
            function(result) {
                if (result) {
                    var nhtml = '<ul>';
                    $.post(url, parametros, function(response){
                        if (response.exitos) {
                            $.each(response.exitos, function(i, val) {
                                nhtml += '<li>'+ val + '</li>';
                            });

                            if (lt === 'aprobados') {
                                $('#lped_aprobados').click();
                                setTimeout(
                                    function(){
                                        $('#colmenuped').find('.accordion-heading a').eq(0).click();
                                    }, 300
                                );
                            }
                            if (lt === 'verificar') {
                                $('#lped_entrantes').click();
                                setTimeout(
                                    function(){
                                        $('#colmenuped').find('.accordion-heading a').eq(0).click();
                                    }, 300
                                );
                            }
                            if (lt === 'verificar_sin') {
                                $('#lped_entrantes').click();
                            }

                            if (lt === 'blo_ped_t') {
                                warehouse_control.armar_box('/ware_house/generar_bloque/',
                                    $('td[data-bloque_cod='+ options.bloque_cod +']')[0],
                                    true
                                );
                                warehouse_control.update_bloque_statics('/ware_house/sumarios/', options.bloque_cod);
                            }
                        }
                        if (response.error) {
                            $.each(response.error, function(i, val){
                                nhtml += '<li>'+ val + '</li>';
                            });

                        }
                        nhtml += '</ul>'
                        notificaciones.noti_popu_faster('NOTIFICACIONES',
                            nhtml, 'info'
                        );
                    }, 'json');
                }
            }
        );
    },
    aprobar_pedido_conflictivo: function(url, parametros) {
        $.post(url, parametros, function(response){
            var nhtml_apro = '';
            if (response.exitos) {
                nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                    '<button type="button" class="close" data-dismiss="alert">X</button>' +
                    '<h4 class="alert-heading">'+ response.exitos  + '</h4>' +
                    '</div>';
            }

            if (response.error) {
                $.each(response.error, function(i, val){
                    nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                        '<button type="button" class="close" data-dismiss="alert">X</button>' +
                        '<h4 class="alert-heading">'+ val  + '</h4>' +
                        '</div>';
                });
            }

            notificaciones.noti_popup('NOTIFICACIONES', nhtml_apro);

            $('#lped_entrantes').click();
            setTimeout(
                function(){
                    $('#colmenuped').find('.accordion-heading a').eq(0).click();
                }, 300
            );
        }, 'json');

    },

    aprobar_pedido: function(url, parametros){
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
            if (response.exitos) {
                nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                    '<button type="button" class="close" data-dismiss="alert">X</button>' +
                    '<h4 class="alert-heading">'+ response.exitos  + '</h4>' +
                    '</div>';

            }

            if (response.error) {
                $.each(response.error, function(i, val){
                    nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                        '<button type="button" class="close" data-dismiss="alert">X</button>' +
                        '<h4 class="alert-heading">'+ val  + '</h4>' +
                        '</div>';
                });
            }
            if (response.duplicados) {
                $.each(response.duplicados, function(i,ldu){
                    $.each(ldu, function(ind, val) {
                        nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                        '<button type="button" class="close" data-dismiss="alert">X</button>' +
                        '<h4 class="alert-heading">'+ val.pedido_numero  + '</h4>' +
                        '<p>PEDIDO DUPLICADO</p>' +
                        '</div>';
                    });
                });
            }
            pedidos_control.listar(url, 'listar_pedidos=true&verificar=true');
            esperar.Unwait();
            notificaciones.noti_popup('NOTIFICACIONES', nhtml_apro);
        }, 'json');
    },

    agrupar_x_familia: function(url, pedido_numero) {
        $.post(url, {
                xfamilia: true,
                pedido_numero: pedido_numero
            },
            function(response){
                if (response.exitos) {
                    notificaciones.noti_popu_faster('.',
                        response.exitos,
                        'info');
                }
                if (response.error) {
                    nhtml = '<ul>';
                    $.each(response.error, function(i,val){
                        nhtml += '<li>' + val + '</li>';
                    });
                    nhtml += '</ul>';
                    notificaciones.noti_popu_faster('ERROR',
                        nhtml,
                        'danger');
                }
                esperar.Unwait();
                ui_control.list_entr();
            }, 'json');
    }

}

productos_control = {
    ini: function(url) {
        $.get(url, {
            inicializar: true
        }, function(response){
            $("#central_content").html(response);
        }, 'html');
    },

    listar: function(url) {
        $.get(url, {listar: true}, function(response) {
            $("#central_content").html(response);
        }, 'html');
        },
    traer_info: function(url, elemento, container){
        $.get(url, {traer_info: true, articulo: $(elemento).val().trim()}, function(response) {
            $(container).html(response);
        }, 'html');
    }
}


power_users_control = {
    ini: function(url) {
        $.get(url, {inicializar: true}, function(response) {
            $("#central_content").html(response);
        }, 'html');
    },
    detalle: function(url, parametros) {
        $.get(url, parametros, function(response) {
            $("#tpower_user_body").html(response);
        }, 'html');
    },
    aprobar: function(parametros){
        bootbox.confirm('ESTA SEGURO ???', function(result) {
                if (result) {
                    esperar.mostrar_dialogo();
                    var dumb = true;
                    var nhtml = '';
                    var articulo_cod = '';
                    $.each($('input[name=ch_pwu]'), function(i,val){
                        if ($(this).prop('checked') == true ) {
                            dumb = false;
                            articulo_cod = $(this).attr('data-articulo');
                            $.post(parametros.url, {
                                aprobar_pwu: true,
                                pwu_pk: $(this).attr('data-pwupk')

                            }, function(response){
                                if (response.exitos) {
                                    nhtml = response.exitos;
                                }
                                if (response.error) {
                                    $.each(response.error, function(i, val){
                                        nhtml += '<p>' + val + '</p>'
                                    });
                                }
                                esperar.cerrar_dialogo();
                            },
                                'json');

                        }

                    });
                    if (dumb === true) {
                           notificaciones.noti_popu_faster('.', 'DEBE SELECCIONAR AL MENOS UN POWER USER', 'danger');
                    }

                    if (dumb === false) {
                        notificaciones.noti_popu_faster('POWER USERS', 'APROBADOS', 'info');
                        setTimeout(function(){
                            power_users_control.detalle('/sman/power_users/', {
                                articulo_cod: articulo_cod,
                                listar: true
                            });
                        }, 500);
                    }
                    esperar.cerrar_dialogo();

                }
        });
    }

}

power_packs_control = {
    ini: function(url) {
        $.get(url, {
            inicializar: true
        }, function(response){
            $("#central_content").html(response);
        }, 'html');
    },

    listar_can_ped: function(url, parametros){
        esperar.mostrar_dialogo();
        $.get(url, parametros, function(response){
//            $(response).modal({
//                show: true
//            });
            $('.productos_container').html(response);

            setTimeout(function(response){
                hacer_tables.big_tables(".pwkc_ped");
            }, 500);
            esperar.cerrar_dialogo();
        }, 'html');
    }
}



ctacte_control = {
    calcular_saldo: function(cliente_cod_suc){
        $.post('/sman/ctacte/', {
            cliente_cod_suc: cliente_cod_suc,
            calcular_saldo: true
        }, function(response){
            if (response.exitos) {
                nhtml = '';
                $.each(response.ctacte, function(i,val){
                    nhtml += '<div class="alert alert-block alert-danger fade in">' +
                             '<button type="button" class="close" data-dismiss="alert">X</button>' +
                             '<h4 class="alert-heading">'+ val.cliente_cod_suc  + '-'+ val.cliente_nombre + '</h4>' +
                             '<p>SALDO INSUFICIENTE </p>' +
//                             '<p>SALDO ACTUALIZADO: '+ val.difmonto +'</p>' +
//                             '<p>SALDO: '+ val.saldo +'</p>' +
//                             '<p>PEDIDOS: '+ val.pedidos +'</p>' +
                             '</div>';
                });

                notificaciones.noti_popup('NOTIFICACIONES', nhtml);
            }
            setTimeout(
                function(){
                    $('#colmenuped').find('.accordion-heading a').eq(0).click();
                }, 300
            );
            $('#lped_aprobados').click();

        }, 'json');

    },
    calcular_efelimite: function(cliente_cod_suc){
        $.post('/sman/ctacte/', {
            cliente_cod_suc: cliente_cod_suc,
            calcular_efelimite: true
        }, function(response){
            if (response.exitos) {
                nhtml = '';
                $.each(response.efelimite, function(i,val){
                    nhtml += '<div class="alert alert-block alert-danger fade in">' +
                             '<button type="button" class="close" data-dismiss="alert">X</button>' +
                             '<h4 class="alert-heading">'+ val.cliente_cod_suc  + '-'+ val.cliente_nombre + '</h4>' +
                             '<p>SUPERA LOS 5000000</p>' +
                             '</div>';
                });
                notificaciones.noti_popup('NOTIFICACIONES', nhtml);
            }

            setTimeout(
                function(){
                    $('#colmenuped').find('.accordion-heading a').eq(0).click();
                }, 300
            );
            $('#lped_aprobados').click();

        }, 'json');

    }

}

ui_control = {
    no_submit_enter: function(query) {
      $(query).bind('keypress keydown keyup', function(e){
          if(e.keyCode == 13) { e.preventDefault(); }
      });
    },

    clear_all_interval: function(){
      for (var i = 1; i < 99999; i++){ window.clearInterval(i); }

    },

    clear_all_timeout: function(){
      for (var i = 1; i < 99999; i++){ window.clearTimeout(i); }

    },

    menu_ini: function(){
        $('#s_menu').on('click', function(){
            if ($('.m_abierto').length > 0 ) {
                $('.pmenu').fadeOut( "slow" );
                $('.m_abierto').removeClass('m_abierto');
                $('.m_abierto').addClass('m_cerrado');
//                $("#central_content").removeClass('col-md-11');
//                $("#central_content").addClass('col-md-12');

            }
            else {
                $('.pmenu').fadeIn( "slow" );
                $('.pmenu').removeClass('m_cerrado');
                $('.pmenu').addClass('m_abierto');
//                $("#central_content").removeClass('col-md-12');
//                $("#central_content").addClass('col-md-12');

            }
        });

        $('.pmenu').fadeOut( "slow" );
        $("#central_content").removeClass('col-md-11');
        $("#central_content").addClass('col-md-12');

    },
    menu_hide: function(){
        $('.pmenu').fadeOut( "slow" );
    },
    menu_show: function(){
        $('.pmenu').fadeIn( "slow" );
    },
    list_apro: function(){
        setTimeout(
                function(){
                    $('#colmenuped').find('.accordion-heading a').eq(0).click();
                }, 300
            );
        $('#lped_aprobados').click();
    },

    list_entr: function(){
//        setTimeout(
//                function(){
//                    $('#colmenuped').find('.accordion-heading a').eq(0).click();
//                }, 300
//            );
        $('#lped_entrantes').click();

    },
    chequear_todos: function(query){
        esperar.mostrar_dialogo();
        $(query).prop('checked', true);
        $(query).trigger("change");
        esperar.cerrar_dialogo();
    },
    desmarcar_todos: function(query){
        esperar.mostrar_dialogo();
        $(query).prop('checked', false);
        esperar.cerrar_dialogo();

    },
     hasta_pos: function(divid){
        $('html, body').animate({scrollTop:$(divid).position().top - 50 }, 'slow');
    },

    dem_select: function(selector, placeholder) {
        $(selector).select2(
            {
                allowClear: true,
                width: 'element',
                placeholder: placeholder
            }
    );
    },
    show_ftab: function(){
        if ($(".tab_t0").hasClass('collapsed')) {
             $(".tab_t0").click();
        }
        $('#ped_det_b').html('');
        $('#catcte_cli').html('');
    },
    show_stab: function(){
        if ($(".tab_t1").hasClass('collapsed')) {
             $(".tab_t1").click();
        }
    },
    lista_mixin_detalle: function(query){
        if ($(query+':hidden').length > 0) { $(query).show()
            return true }
        if ($(query+':visible').length > 0) { $(query).hide()
            return true }
    },
    draw_global_distribuicion: function(url){
        esperar.Wait('body');
        $.get(url, {
            global_distribucion: true
        }, function(response){
              $('#global_distribucion').html(response);
              esperar.Unwait();
         }, 'html' );
    },
    draw_global_facturacion: function(url){
        esperar.Wait('body');
        $.get(url, {
            global_facturacion: true
        }, function(response){
              $('#global_facturacion').html(response);
              esperar.Unwait();
         }, 'html' );
    },
    traer_marcados_generic: function(query, searchs){
        data_http = [ ];
        var global_ele = '';
        $.each($(query), function(i, val){
            if ($(this).prop('checked') == true ) {
                global_ele = this;
                $.each(searchs, function(i,data_s){
                    data_http.push({
                        name: data_s[0],
                        value: $(global_ele).parent().parent().attr(data_s[1])
                    });
                });
            }
        });
        return data_http
    },
    grant_focus: function(element, query, marfocus,qmard, marc, keepvalue) {
        if (marfocus) {
            //si se marca un foco especifico, quiere decir
            //que es selectivo, entonces los otros se desmarcan
            $(qmard).removeClass(marc);
            $(element).addClass(marc);
        }
        if (!keepvalue){
            $(query).val('');
        }

        $(query).focus();

    },
    onbyfocus: function(query, qsl){
        $(query).focusout(function(evt){
            $(qsl).removeClass('btn-danger');
        });
    },
    show_component_request: function(query, element){
        telem = $(element);
        if (telem.next(query+':hidden').length > 0) {
            telem.next(query+':hidden').show();
            return true
        }

        if (telem.next(query+':visible').length > 0) {
            telem.next(query+':visible').hide();
            return true
        }
    },
    show_component_request_table: function(query){
        if ($(query+':hidden').length > 0) {
            $(query+':hidden').show();
            return true
        }

        if ($(query+':visible').length > 0) {
            $(query+':visible').hide();
            return true
        }
    },
    select_by_descripcion: function(selector, text) {
        $(selector).filter(function() {
            return $(this).text() == text;
        }).prop('selected', true);
}
}

netipa_control = {
    acceso: function(url, us_t){
        $.get(url, {
            us_t: us_t
        }, function(response){
            null;
        }, 'json');
    }
}


it_control = {
    ws_control: {
        ini: function(url){
            esperar.mostrar_dialogo();
            $.get(url, {ini: true}, function(response){
               $("#central_content").html(response);
                esperar.cerrar_dialogo();
            });
        },
        update_cache: function(url) {
            esperar.mostrar_dialogo();
            $.post(url, {actualizar_cache: true}, function(response){
               notificaciones.noti_popu_faster('EXITOS', response.exitos, 'info')
                esperar.cerrar_dialogo();
            }, 'json');

        }
    }
}


warehouse_control = {
    generar_bloque: function(url, parametros) {
        esperar.Wait('body');
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>EXITOS</p>' +
                                   '</div>';
                      });
              }
              if (response.error) {               
                  $.each(ldu, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });
                        
               }
               esperar.Unwait();
               notificaciones.noti_popup('NOTIFICACION', nhtml_apro);
        }, 'json');

    },

//    generar_bloque_definitivo: function(url, bloque_cod) {
//        parametros = {
//            bloque_definitivo: true,
//            bloque_cod: bloque_cod
//        }
//        esperar.Wait('body');
//        var nhtml_apro = '';
//        $.post(url, parametros, function(response){
//             if (response.exitos) {
//                $.each(response.exitos, function(i, val){
//                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
//                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
//                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
//                                   '<p>BLQOUE DEFINITIVO</p>' +
//                                   '</div>';
//                      });
//                 $('.gen_bloque_def').remove();
//                 $('#bloque_'+ response.bloque_borrador_cod).remove();
//
//              }
//              if (response.error) {
//                  $.each(response.error, function(ind, val) {
//                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
//                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
//                               '<h4 class="alert-heading">'+ val + '</h4>' +
//                               '<p>BLOQUE DEFINITIVO ERROR</p>' +
//                               '</div>';
//                   });
//
//               }
//               esperar.Unwait();
//               notificaciones.noti_popup('BLOQUES', nhtml_apro);
//              }, 'json');
//    },

    on_cheq_pedidos: function() {
//        $('#encola_bloque').off();
//        $('#encola_bloque').on('click', function(event){
            esperar.Wait('body');
            var guardar = false;
            var borblo_obj = {};
            var para_sum = [
                { name: 'min_sumario',
                  value: true }
            ];

            borblo = localStorage.getItem('borrador_bloques');
            if (borblo) {
                borblo_obj = JSON.parse(borblo);
            }

            $.each($('input[name=chpro]'), function(i, val) {
                if ($(this).prop('checked') == true) {
                    guardar = true;
                    pedido_numero = $(this).parent().parent().attr('data-pedido-numero');
                    tr_pedido_html = $(this).parent().parent().html();
                    if (!borblo_obj.hasOwnProperty(pedido_numero)) {
                        borblo_obj[pedido_numero] = tr_pedido_html;
                    }

                }
            });
            if (guardar === true) {
                localStorage.setItem('borrador_bloques', JSON.stringify(borblo_obj));
                notificaciones.noti_popu_faster('EXITOS',
                    'PEDIDOS COLOCADOS EN COLA PARA BLOQUE', 'info'
                );
                $.each(borblo_obj, function(i, val){
                    para_sum.push(
                        { name: 'pedido_numero' , value: i}
                    );
                });
                warehouse_control.min_sumario_bloque(para_sum, '#sumario_borrador_bloque');
            }
            esperar.Unwait();
            warehouse_control.tildar_marcados();
//        });
    },

    check_local_bloque: function() {
        //los pedidos marcados para el bloque se
        //guardan en un local storage, de manera que persista la seleccion multiple de filtros
        //sin necesidad de hacer tantas llamadas ajax
        borblo = localStorage.getItem('borrador_bloques');
        var para_sum = [
                {name: 'min_sumario', value: true}
        ];

        if (borblo) {
            borblo_obj  = JSON.parse(borblo);

            $('#ped_lis_b').html('');
            $.each(borblo_obj, function(i, val) {
                $('#ped_lis_b').append('<tr class="info">'+val+'</tr>');
                para_sum.push({
                    name: 'pedido_numero', value: i
                })
            });
            $('input[name=chpro]').parent().html('<h4>MARCADO PARA BLOQUE BORRADOR</h4>');

            ped_table = $('#pedidos_lista');
            ped_table.trigger("update")
                .trigger("sorton", [ped_table.get(0).config.sortList])
                .trigger("appendCache")
                .trigger("applyWidgets");
            ui_control.hasta_pos('#sumario_borrador_bloque');
            warehouse_control.min_sumario_bloque(para_sum, '#sumario_borrador_bloque');
        }
        else {
          notificaciones.noti_popu_faster('BORRADOR BLOQUE',
                          'NO TIENE PEDIDOS MARCADOS PARA BORRADOR DE BLOQUE', 'info'
                  );
        }
    },

    borrador_bloque_controles: function(url, parametros, dquery){
        esperar.WaitInElement('#pedidos_control');
        $.get(url, parametros, function(response){
              $(dquery).html(response);
              esperar.UnwaitInElement();
         }, 'html' );
    },

    tildar_marcados: function() {
        esperar.Wait('body');
        borblo = localStorage.getItem('borrador_bloques');
        if (borblo) {
            borblo_obj  = JSON.parse(borblo);
            $.each(borblo_obj, function(i, val) {
                $('tr[data-pedido-numero='+i+'] td:last-child').html('<h4>MARCADO PARA BORRADOR BLOQUE</4>');
            });
        }
        esperar.Unwait();
    },

    borrar_marcados_bloque: function(){
        esperar.Wait('body');
        localStorage.removeItem('borrador_bloques');
        notificaciones.noti_popu_faster('PEDIDOS BORRADOR BLOQUE',
                'PEDIDOS BORRADOS', 'info'
        );
        esperar.Unwait();
        $('#lped_procesados').click();

    },

    generar_borrador_bloque: function(url, vencimiento) {
        esperar.Wait('body');
        var nhtml_apro = '';

        borblo = localStorage.getItem('borrador_bloques');
        if (borblo) {
            borblo_obj  = JSON.parse(borblo);
            if (vencimiento === 'true') {
                parametros = [
                    { name: 'borrador_bloque',
                        value: true },
                    { name: 'vencimiento', value: $('input[name=bloque_vencimiento]:checked').length },
                    { name: 'observacion', value: $('textarea[name=observacion_bloque]').val() }
                ]
            }
            else {
                parametros = [
                    { name: 'borrador_bloque',
                        value: true }
                ]
            }

            $.each(borblo_obj, function(i, val) {
                $('tr[data-pedido-numero='+i+'] td:last-child').html('<h4>MARCADO PARA BORRADOR BLOQUE</4>');
                parametros.push({
                    name: 'pedido_numero', value: i
                });
            });

            $.post(url, parametros, function(response){
                if (response.exitos) {
                    $.each(response.exitos, function(i, val){
                        nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                            '<button type="button" class="close" data-dismiss="alert">X</button>' +
                            '<h4 class="alert-heading">'+ val  + '</h4>' +
                            '<p>GENERACION DE BORRADOR EXITOSA <span class="glyphicon glyphicon-thumbs-up"></span></p>' +
                            '</div>';
                    });
                    warehouse_control.borrar_marcados_bloque();
                }
                if (response.error) {
                    $.each(response.error, function(ind, val) {
                        nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                            '<button type="button" class="close" data-dismiss="alert">X</button>' +
                            '<h4 class="alert-heading">'+ val + '</h4>' +
                            '<p>ERROR</p>' +
                            '</div>';
                    });
                }
                esperar.Unwait();
                notificaciones.noti_popup('BORRADOR BLOQUE',
                    nhtml_apro);
            }, 'json');
        }
        else {
            notificaciones.noti_popu_faster('PEDIDOS BORRADOR BLOQUE',
                'NO TIENE PEDIDOS MARCADOS', 'error'
            );
            esperar.Unwait();
        }
    },

    generar_bloque_definitivo: function(url, bloque_cod) {
        parametros = {
            generar_bloque_definitivo: true,
            bloque_cod: bloque_cod
        }

        esperar.Wait('body');
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>GENERACION EXITOSA</p>' +
                                   '</div>';
                      });
              }
              if (response.error) {
                  $.each(ldu, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });

               }
               esperar.Unwait();
               notificaciones.noti_popup('BLOQUE', nhtml_apro);
              }, 'json');


    },

    min_sumario_bloque: function(parametros, query){
        esperar.WaitInElement(query);
        $.get('/ware_house/sumarios/', parametros, function(response){
              $(query).html(response);
         }, 'html' );
    },

    listar: function(url, parametros, target){
        esperar.WaitInElement(target);
        $.get(url, parametros, function(response){
              $(target).html(response);
              esperar.Unwait();
         }, 'html' );
    },


    listar_bloques_problemas: function(url){
        esperar.WaitInElement('#f_tab');
        parametros = {
            'listar_bloques_problemas': true
        }
        $.get(url, parametros, function(response){
              $('#f_tab').html(response);
         }, 'html' );
    },

    bloque_ui: function(url, parametros) {
        ui_control.show_ftab();
        esperar.WaitInElement('#bloque_list');
        $.get(url, parametros, function(response){
              $('#bloque_list').html(response);
              esperar.Unwait();
         }, 'html' );
    },
    bodegas_ui: function(url, parametros){
        ui_control.show_ftab();
        esperar.WaitInElement('#bloque_list');
        $.get(url, parametros, function(response){
              $('#bloque_list').html(response);
              esperar.Unwait();
         }, 'html' );
    },
    bloque_estructura: function(url, bloque_cod) {
        pars = {
            bloque_cod: bloque_cod,
            bloque_estructura: true
        }
        esperar.WaitInElement('#bloque_distribucion');
        $.get(url, pars, function(response){
            $('#bloque_distribucion').html(response);
            ui_control.show_stab();
         }, 'html' );

    },

    requerimiento_productos: function(url, bloque_cod) {
        esperar.WaitInElement('#bloque_list_panel');
        parametros = {
            requerimiento_productos: true,
            bloque_cod: bloque_cod
        }
        $.get(url, parametros, function(response){
              $('#bloque_list_panel_titulo').html('REQUERIMIENTO DE PEDIDOS / GENERACION DE COMPROBACION DE EXITENSIA DE MERCADERIAS');
              $('#bloque_list_panel').html(response);
         }, 'html' );

    },

    generar_bloque_requerimientos: function(url, bloque_cod) {
        esperar.Wait('body');
        parametros = {
            generar_bloque_requerimientos: true,
            bloque_cod: bloque_cod
        }
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>GENERACION EXITOSA</p>' +
                                   '</div>';
                });
              }
              if (response.error) {
                  $.each(response.error, function(id, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>GENERACION ERRONEA</p>' +
                               '</div>';
                   });
               }
               if (response.update) {
                   warehouse_control.estado_generar_bloque_req_ui();
                   warehouse_control.estado_generar_bloque_requerimientos(url, bloque_cod);
               }
               esperar.Unwait();
               notificaciones.noti_popup('GENERACION', nhtml_apro);
        }, 'json');
    },
    estado_generar_bloque_req_ui: function(){
        dhtml = ['<div class="table-responsive">',
            '<table class="table table-bordered">',
            '<thead>',
            '<tr>',
            '<th>PROGRESO - ESTADO DE GENERACION DE REQUERIMIENTOS PARA EL BLOQUE</th>',
            '</tr>',
            '</thead>',
            '<tbody>',
            '<tr>',
            '<td><h3 id="msg_worker_gen" class="info"></h3></td>',
            '</tr>',
            '<tr class="danger">',
            '<th><h3 class="b_pallets">BUSQUEDA DE PALLETS</h3></th>',
            '</tr>',
            '<tr class="danger">',
            '<th><pre class="b_pallets_log"></pre></th>',
            '</tr>',
            '</tbody></table></div>',
            ''
        ];
        $('#bloque_list_panel').html('');
        $('#bloque_list_panel').html(dhtml.join(' '));
        setTimeout(function(){
            $('.b_pallets, .b_pallets_log').hide();
        }, 300);
    },

    estado_generar_bloque_requerimientos: function(url, bloque_cod) {
        moni_parametros = {estado_generar_blqoue_requerimientos: true, bloque_cod: bloque_cod};
        lintg =  setInterval(function(){
            $.post(url, moni_parametros, function(response){
                if (response.estado === 'SUCCESS') {
                    $('#msg_worker_gen').html('GENERACION DE REQUERIMIENTOS FINALIZADA');
                    clearInterval(lintg);
                    warehouse_control.requerimiento_productos(url, bloque_cod);
                }
                else {
                    dhtml = ['ETAPA ', response.etapa, ' - ', response.mensaje, ' - ', response.articulo_numero, ' - ', response.total_articulos];
                    $('#msg_worker_gen').html(dhtml.join(' '));
                    if (response.etapa === 3) {
                        $('.b_pallets, .b_pallets_log').show();
                        $('.b_pallets_log').text(response.log_lines);
                    }
                }
            }, 'json');
        }, 5000);
    },

    limpiar_bloque_problemas: function(url, bloque_cod) {
        esperar.Wait('body');
        parametros = {
            limpiar_bloque_problemas: true,
            bloque_cod: bloque_cod
        }
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>BLOQUE SIN PROBLEMAS</p>' +
                                   '</div>';
                      });
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>EL BLOQUE CONTINUA CON PROBLEMAS</p>' +
                               '</div>';
                   });
               }
               esperar.Unwait();
               notificaciones.noti_popup('BLOQUE', nhtml_apro);
        }, 'json');
    },

    armar_box: function(url, bloque_cod) {
        pars = {
            bloque_cod: bloque_cod,
            armar_box: true
        }
        esperar.WaitInElement('#bloque_list_panel');
        $.get(url, pars, function(response){
            $('#bloque_list_panel_titulo').html('DISTRIBUCION DE PEDIDOS POR BOXES');
            $('#bloque_list_panel').html(response);
         }, 'html' );
    },
    borrar_pedidos_box: function(url, bloque_cod, box_cod) {
        esperar.Wait('body');
        parametros = [
            { name: 'borrar_pedidos_box', value: true },
            { name: 'bloque_cod', value: bloque_cod },
            { name: 'box_cod', value: box_cod }
        ]

        pedidos_numeros = ui_control.traer_marcados_generic('input[name=chpro_list_pedidos_boxes]',
                                                    [['pedidos_numeros', 'data-pedido_numero']]
                                                    );
        if (pedidos_numeros.length === 0) {
            notificaciones.noti_popu_faster('ERROR',
                'DEBE SELECCIONAR AL MENOS UN PEDIDO',
                'danger');
            return
        }
        Array.prototype.push.apply(parametros, pedidos_numeros);

        $.post(url, parametros, function(response){
            mensajes.ini_arri();
            if (response.exitos) {
                $.each(response.exitos, function(i,val){
                    mensajes.exitos(val);
                });
                warehouse_control.armar_box(url, bloque_cod);
                pedidos_control.listar_pedidos_en_box('/sman/administrador_ventas/', box_cod, bloque_cod);
            }
            if (response.error) {
                $.each(response.error, function(i,val){
                    mensajes.error(val);
                });
            }
            esperar.Unwait();


         }, 'json' );
    },

    enviar_a_box: function(url, bloque_cod){
        var options;
        var select = $('#blo_select_peds');
        esperar.Wait('body');
        parametros = [{name: 'bloque_cod', value: bloque_cod},
            { name: 'enviar_a_box', value: true}];
        values = $('#blo_select_peds').val();
        box_cod = $( "li.ui-selected").attr('data-box_cod');
        if (box_cod === undefined ) {
            notificaciones.noti_popu_faster('ERROR',
            'DEBE SELECCIONAR AL MENOS UN BOX',
            'danger');
            esperar.Unwait();
            return
        }

        if (!values) {
            notificaciones.noti_popu_faster('ERROR',
            'DEBE SELECCIONAR AL MENOS UN PEDIDO',
            'danger');
            esperar.Unwait();
            return
        }

        $.each(values, function(i, val){
            parametros.push({name: 'pedidos_numeros', value: val});
        });

        parametros.push({name: 'box_cod', value: box_cod})

        $.post(url, parametros, function(response){
            notificaciones.noti_popu_faster('EXITOS',
              'PEDIDOS PUESTOS EN EL BOX ' + response.box_cod,
              'info');
            $( "li.ui-selected").css('color', 'red');
            $( "li.ui-selected").removeClass('ui-selected');
            $('#box_selectable li[data-box_cod='+ response.box_cod +'] .box_peso').text(response.box_peso);
            $('#box_selectable li[data-box_cod='+ response.box_cod +'] .box_vol').text(response.box_volumen);
            esperar.Unwait();
            //actualizar lista de pedidos
            warehouse_control.armar_box(url,bloque_cod);
         }, 'json' );
    },

    min_cam_sumario: function(url, bloque_cod, camion_numero){
        parametros = [
            { name: 'min_cam_sumario', value: true },
            { name: 'bloque_cod', value: bloque_cod },
            { name: 'camion_numero', value: camion_numero }
        ];

        $.each($('#id_reparto_boxes').val(), function(i, val){
            parametros.push({name: 'boxs_cods', value: val});
        });

        $('#panel-reparto-volumen').show();
        esperar.WaitInElement('#panel-reparto-volumen-body');

        $.get(url, parametros, function(response){
              $('#panel-reparto-volumen-body').html(response);
         }, 'html' );
    },

    armar_repartos: function(url, bloque_cod) {
        parametros = {
            armar_repartos: true,
            bloque_cod: bloque_cod
        }
        esperar.WaitInElement('#bloque_list_panel');
        $.get(url, parametros, function(response){
              $('#bloque_list_panel_titulo').html('ARMADO DE REPARTOS BLOQUE '+bloque_cod);
              $('#bloque_list_panel').html(response);
              esperar.Unwait();
         }, 'html' );
    },

    listar_repartos: function(url, bloque_cod) {
        parametros = {
            listar_repartos: true,
            bloque_cod: bloque_cod
        }
        esperar.WaitInElement('#bloque_list_panel');
        $.get(url, parametros, function(response){
              $('#bloque_list_panel_titulo').html('REPARTOS PARA EL BLOQUE '+bloque_cod);
              $('#bloque_list_panel').html(response);
              esperar.Unwait();
         }, 'html' );
    },

    detalle_reparto: function(url, reparto_numero, bloque_cod) {
        $('#panel-reparto-detalle').show();
        parametros = {
            detalle_reparto: true,
            reparto_numero: reparto_numero,
            bloque_cod: bloque_cod
        }
        esperar.WaitInElement('#panel-reparto-detalle-body');
        $.get(url, parametros, function(response){
              $('#panel-reparto-detalle-titulo').html('DETALLE DEL REPARTO ' + reparto_numero);
              $('#panel-reparto-detalle-body').html(response);
              esperar.Unwait();
         }, 'html' );
    },

    listar_clientes_reparto_prioridad: function(url, bloque_cod){
        if ($('#id_reparto_boxes').val()) {
            parametros = [
                {name: 'listar_clientes_reparto_prioridad', value: true},
                {name: 'bloque_cod', value: bloque_cod}
            ];

            $.each($('#id_reparto_boxes').val(), function(i, val){
                parametros.push({name: 'boxs_cods', value: val});
            });
            esperar.WaitInElement('#panel-reparto-prioridad-body');
            $.get(url, parametros, function(response){
                $('#panel-reparto-prioridad-titulo').html('PRIORIDAD PARA ENTREGA DE REPARTOS');
                $('#panel-reparto-prioridad-body').html(response);
             }, 'html' );

        } else {
            mensajes.ini_arri();
            mensajes.error('DEBE SELECCIONAR AL MENOS UN BOX');
        }
    },

    guardar_prioridades_reparto: function(url, bloque_cod) {
        parametros = [
                { name: 'guardar_prioridades_reparto', value: true },
                { name: 'bloque_cod', value: bloque_cod }
        ];

        $.each($('input[name=box_prioridad]'), function(i, val){
            parametros.push({name: 'boxs_cods', value: $(val).val()});
        });

        $.each($('input[name=prioridad_cliente]'), function(i, val){
            parametros.push({name: 'cliente_cod_suc', value: $(val).attr('data-cliente_cod_suc')});
            parametros.push({name: 'prioridad', value: $(val).val()});
        });

        esperar.Wait('body');
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>PRIORIDADES DE REPARTO</p>' +
                                   '</div>';
                      });
                 warehouse_control.listar_clientes_reparto_prioridad('/ware_house/generar_bloque/', bloque_cod);
             }

            if (response.error) {
                  $.each(ldu, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>PRIORIDADES DE REPARTO</p>' +
                               '</div>';
                   });

            }
            esperar.Unwait();
            notificaciones.noti_popup('mensajes', nhtml_apro);
        }, 'json');
    },

    bloque_sumario: function(url, bloque_cod) {
        pars = {
            bloque_cod: bloque_cod,
            bloque_sumario: true
        }
        esperar.WaitInElement('#bloque_list_panel');
        $.get(url, pars, function(response){
            $('#bloque_list_panel_titulo').html('SUMARIO DEL BLOQUE '+bloque_cod);
            $('#bloque_list_panel').html(response);
         }, 'html' );

    },

    generar_bloque_repartos_movimientos: function(url, bloque_cod, por_pedido) {
        //
        parametros = [
                { name: 'generar_bloque_repartos_movimientos', value: true },
                { name: 'bloque_cod', value: bloque_cod },
                { name: 'por_pedido', value: por_pedido }
        ];
        esperar.Wait('body');
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>REPARTO MOVIMIENTOS</p>' +
                                   '</div>';
                      });
              }
              if (response.error) {
                  $.each(ldu, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>REPARTO MOVIMIENTOS</p>' +
                               '</div>';
                   });

               }
               esperar.Unwait();
               notificaciones.noti_popup('MOVIMIENTOS', nhtml_apro);
              }, 'json');
    },

    crear_reparto: function(url, bloque_cod) {
        esperar.WaitInElement('#bloque_list_panel');
        parametros = [{name:'crear_reparto', value: true},
            {name:'bloque_cod', value: bloque_cod}
        ];
        box_cod = $("#box_selectable_cam li.ui-selected").attr('data-box_cod');
        box_cod_sel = $("#box_selectable_cam li.ui-selected");
        camion_numero = $('#blo_select_cams').val();
        involucrados = $('#blo_select_chofer').val();

        if (!camion_numero || !involucrados) {
            notificaciones.noti_popu_faster('ERROR',
            'DEBE SELECCIONAR AL MENOS CAMION y 3 RESPONSABLES',
            'danger');
            esperar.Unwait();
            return
        }

        if (involucrados.length != 3) {
            notificaciones.noti_popu_faster('ERROR',
            'DEBE SELECCIONAR 3 O MAS RESPONSABLES',
            'danger');
            esperar.Unwait();
            return
        }

        if (box_cod === undefined ) {
            notificaciones.noti_popu_faster('ERROR',
            'DEBE SELECCIONAR AL MENOS UN BOX',
            'danger');
            esperar.Unwait();
            return
        }

        $.each(box_cod_sel, function(i, val){
            parametros.push({
                name: 'box_cod', value: $(this).attr('data-box_cod')
            });
        });

        parametros.push({name: 'camion_numero', value: camion_numero});

        $.each(involucrados,function(i, val){
            parametros.push({name: 'involucrados', value: val});
        });

        parametros.push({name: 'cam_total_peso', value: $('.cam_total_peso').text()});
        parametros.push({name: 'cam_total_volumen', value: $('.cam_total_volumen').text()});
        parametros.push({name: 'cam_total_articulos', value: $('.cam_total_articulos').text()});
        parametros.push({name: 'cam_total_pedidos', value: $('.cam_total_pedidos').text()});

        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>REPARTO CREADO</p>' +
                                   '</div>';
                      });

                 $.get('/ware_house/generar_bloque/',
                     {bloque_box_camion: true,
                         bloque_cod: response.bloque_cod
                     }, function(response) {
                         $('#blo_camiones').html(response)
                     }, 'html'
                 );
              }
              if (response.error) {
                  $.each(ldu, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR </p>' +
                               '</div>';
                   });

               }
               esperar.Unwait();
               notificaciones.noti_popup('ERROR', nhtml_apro);
              }, 'json');
    },
    anular_pedido: function(url, bloque_cod, qs){
        parametros = [{name: 'anular_pedido', value: true},
            {name: 'motivo', value: 'BORRADO_EN_BLOQUE'},
            {name: 'bloque_cod', value: bloque_cod}
        ];

        options = {bloque_cod: bloque_cod};
        //bloque pedido tratamiento
        pedidos_numeros = pedidos_control.traer_marcados(qs);
        if (pedidos_numeros.length === 0) {
            notificaciones.noti_popu_faster('ERROR',
                'DEBE SELECCIONAR AL MENOS UN PEDIDO/ITEM',
                'danger');
            return
        }
        Array.prototype.push.apply(parametros, pedidos_numeros);
        pedidos_control.anular_pedido(url, parametros, 'blo_ped_t', options);
    },

    borrar_item_blo: function(url, bloque_cod, qs) {
        bootbox.confirm('ESTA SEGURO', function(result) {
                if (result) {
//                    pedidos_numeros = pedidos_control.traer_marcados("input[name=chpro]");
                    pedidos_numeros = pedidos_control.traer_marcados(qs);
                    if (pedidos_numeros.length === 0) {
                        notificaciones.noti_popu_faster('ERROR',
                            'DEBE SELECCIONAR AL MENOS UN PEDIDO/ITEM',
                            'danger');
                        return
                    }

                    parametros = [{name: 'borrar_item_mul', value: true},
                        {name: 'motivo', value: 'BORRADO_EN_BLOQUE'},
                        {name: 'bloque_cod', value: bloque_cod}
                    ];
                    Array.prototype.push.apply(parametros, pedidos_numeros);
                    $.post(url, parametros,
                        function(response){
                            if (response.exitos) {
                                notificaciones.noti_popu_faster('OK', 'ARTICULOS ELIMINADOS', 'danger');

                                warehouse_control.armar_box('/ware_house/generar_bloque/',
                                    bloque_cod,
                                    true
                                );
                                warehouse_control.update_bloque_statics('/ware_house/sumarios/', bloque_cod);

                            }
                            if (response.error) {
                                notificaciones.noti_popu_faster('ERROR', response.error, 'danger');
                            }
//                            $('.modal-backdrop').remove();
                            esperar.cerrar_dialogo();
                        }, 'json');
                }
            }
        );
    },
    ped_esta_orig: function(url, bloque_cod, qs){
        bootbox.confirm('ESTA SEGURO', function(result) {
                if (result) {
                    parametros = [{name: 'ped_esta_orig', value: true},
                        {name: 'bloque_cod', value: bloque_cod}
                    ];
                    pedidos_numeros = pedidos_control.traer_marcados(qs);
                    if (pedidos_numeros.length === 0) {
                        notificaciones.noti_popu_faster('ERROR',
                            'DEBE SELECCIONAR AL MENOS UN PEDIDO/ITEM',
                            'danger');
                        return
                    }

                    Array.prototype.push.apply(parametros, pedidos_numeros);

                    esperar.Wait('body');
                    var nhtml_apro = '';
                    $.post(url, parametros, function(response){
                         if (response.exitos) {
                            $.each(response.exitos, function(i, val){
                                 nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                               '<h4 class="alert-heading">'+ val  + '</h4>' +
                                               '<p>PEDIDO ENVIADO A ZONA DE CARGA</p>' +
                                               '</div>';
                            });
                             warehouse_control.armar_box('/ware_house/generar_bloque/',
                                    $('td[data-bloque_cod='+ bloque_cod +']')[0],
                                    true
                             );
                             warehouse_control.update_bloque_statics('/ware_house/sumarios/', bloque_cod);
                          }
                           esperar.Unwait();
                           notificaciones.noti_popup('BLOQUE', nhtml_apro);
                            $('.modal-backdrop').remove();
                          },
                    'json');

                }
            }
        );
    },
    distribuir_faltantes: function(url, pk){
        ui_control.show_stab();
        esperar.WaitInElement('#bloque_distribucion');
        $.get(url,
            {
                pedido_pk: pk,
                distribuir_faltantes: true
            }, function(response){
                $('#bloque_distribucion').html(response);
//                $("#distribuir_faltantes_modal .modal-body").html(response);
//                $("#distribuir_faltantes_modal").modal();
            }, 'html');
    },
    guardar_dist_faltantes: function(url, pedpk) {

        ped_cantidad = $('#ped_cantidad_' + pedpk).val();
        pall_pk = $('#ped_pall_' + pedpk).val();
        pall_cantidad = $('#pall_cantidad_' + pedpk).val();
        mensajes.ini_arri();
        var nhtml_apro = '';
        parametros = {
            pall_pk: pall_pk,
            pall_cantidad: pall_cantidad,
            ped_pk: pedpk,
            ped_cantidad: ped_cantidad,
            dist_cant_faltantes: true
        }

        esperar.Wait('body');
        $.post(url, parametros, function(response){
            if (response.exitos) {
                $.each(response.exitos, function(i, val){
                    mensajes.exitos(val);
                });
                esperar.Unwait();
            }
            if (response.error) {
                $.each(response.error, function(i, val){
                    mensajes.error(val);
                });
            }

            if (response.cerrar_dialogo) {
                $('#distribuir_faltantes_modal').modal('hide');
            }

            if (response.procesar_problemas) {
                setTimeout(function(){
                    warehouse_control.armar_box('/ware_house/generar_bloque/',
                            $('td[data-bloque_cod='+ response.bloque_cod +']')[0],
                            true
                    );
                }, 500);
            }

            if (response.pedido_pk){
                $('tr[data-pedido-pk='+ response.pedido_pk + ']').hide();
            }
            if(response.pall_valor_disminucion){
                $('#pall_'+response.pall_numero).html(response.pall_valor_disminucion);
            }

            notificaciones.noti_popup('', nhtml_apro);
              }, 'json');
    },
    update_bloque_statics: function(url, bloque_cod) {
        parametros = {
            update_bloque_statics: true,
            bloque_cod: bloque_cod
        }
        $.get(url, parametros, function(response){
            console.log(response);
         }, 'json' );
    },

    confirmar_movimiento: function(url, movimiento_pk, mov_pk, valor, multiplo) {
        if (multiplo.prop('checked') == true ) {
            parametros = {
                confirmar_movimientos: true,
                numero_movimiento: movimiento_pk,
                mov_pk: mov_pk,
                valor: valor,
                multiplo: true
            }


        }
        else {
            parametros = {
                confirmar_movimientos: true,
                numero_movimiento: movimiento_pk,
                mov_pk: mov_pk,
                valor: valor
            }
        }

        esperar.Wait('body');

        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                //actualizar badge y esas cosas
                 if (response.incompleto) {
                     $('#articulo_badge_'+response.articulo_cod).text(response.cantidad_confirmada);
                     $('#mov_'+response.mov_pk).val('');
                     $('#mov_'+response.mov_pk).focus();
                     $('#mov_'+response.mov_pk).parent().parent().next().html('<span class="glyphicon glyphicon-hand-down"></span>');
                 }

                 if (response.completo) {
                     $('#mov_'+response.mov_pk).parent().parent().next().html('<span class="glyphicon glyphicon-hand-down"></span>');
                     $('#mov_'+response.mov_pk).parent().parent().html(
                         '<div class="alert alert-succuss"><span class="glyphicon glyphicon-check"></span></div>'
                     );
                     $('#table_bod_movimiento input').eq(0).focus();
                 }
                 if (response.confirmados) {
                     $('#blo_pallets').html('<div class="alert alert-danger"><strong>YA SE REALIZO LA COMPROBACION DE LOS PALLETS</strong></div>');
                 }
                 nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">MOVIMIENTO</h4>' +
                               '<p>REALIZADO</p>' +
                               '</div>';
                 esperar.Unwait();
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR.</p>' +
                               '</div>';
                   });
                  $('#mov_'+response.mov_pk).val('');
                  $('#mov_'+response.mov_pk).focus();
                  esperar.Unwait();
               }
               notificaciones.noti_popup('PALLETS', nhtml_apro);
              }, 'json');
    },

    confirmar_blo_pallets: function(url, bloque_cod, pall_numero, valor) {
        parametros = {
            bloque_pallets_check: true,
            bloque_cod: bloque_cod,
            pall_numero: pall_numero,
            valor: valor
        }

        esperar.Wait('body');
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                //actualizar badge y esas cosas
                 if (response.incompleto) {
                     $('#pall_badge_'+response.pall_numero).text(response.cantidad_confirmada);
                     $('#pall_'+response.pall_numero).val('');
                     $('#pall_'+response.pall_numero).focus();
                 }

                 if (response.completo) {
                     $('#pall_'+response.pall_numero).parent().parent().html(
                         '<div class="alert alert-succuss"><span class="glyphicon glyphicon-check"></span></div>'
                     );
                     $('#pall_list_logistica input').eq(0).focus();
                 }
                 if (response.confirmados) {
                     $('#blo_pallets').html('<div class="alert alert-danger"><strong>YA SE REALIZO LA COMPROBACION DE LOS PALLETS</strong></div>');
                 }
                 notificaciones.noti_popup('PALLETS', 'OK');
                 esperar.Unwait();
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR.</p>' +
                               '</div>';
                   });
                  $('#pall_'+response.pall_numero).val('');
                  $('#pall_'+response.pall_numero).focus();
                  esperar.Unwait();
               }
               notificaciones.noti_popup('PALLETS', nhtml_apro);
              }, 'json');
    },

    confirmar_blo_box: function(url, bloque_cod, box_numero, valor, articulo_cod, tipo) {
        esperar.Wait('body');
        parametros = {
            bloque_box_dist_manag: true,
            bloque_cod: bloque_cod,
            valor: valor,
            articulo_cod: articulo_cod,
            tipo: tipo
        }

        if (tipo === 'box' || tipo == 'picking') {
            parametros['box_numero'] = box_numero;
        }

        if (tipo === 'reparto') {
            parametros['reparto_numero'] = box_numero;
        }

        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                //actualizar badge y esas cosas
                 if (response.incompleto) {
                     $('#articulo_badge_'+response.articulo_cod).text(response.cantidad_confirmada);
                     $('input[data-articulo-cod='+response.articulo_cod + ']').val('');
                     $('input[data-articulo-cod='+response.articulo_cod + ']').focus();
                     esperar.Unwait();
                 }
                 if (response.completo) {
                     $('input[data-articulo-cod='+response.articulo_cod + ']').parent().parent().html(
                         '<div class="alert alert-succuss"><span class="glyphicon glyphicon-check"></span></div>'
                     );
                     $('#table_blo_box_dist input').eq(0).focus();
                     esperar.Unwait();
                 }
                 if (response.confirmados) {
                     if (response.tipo == 'box' || response.tipo == 'picking') {
                         $('#blo_box_dist_manag').html('<br><br><br><br><br><br><div class="alert alert-danger"><strong>YA SE REALIZO EL TRASPASO DE LOS ARTICULOS</strong></div>');
                     }
                     esperar.Unwait();
                 }
                 notificaciones.noti_popup(response.tipo, 'OK');
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR.</p>' +
                               '</div>';
                   });
                  $('input[data-articulo-cod='+response.articulo_cod + ']').val('');
                  $('input[data-articulo-cod='+response.articulo_cod + ']').focus();
                  esperar.Unwait();
               }
               notificaciones.noti_popup(response.tipo, nhtml_apro);
              }, 'json');
    },
    empty_input_label: function(qs, tipo){
        $(qs).bind('change',{tipo: tipo}, function(event){
            element = $(this);
            var text = $(element).val();
            multiplo_element = $(this).parent().parent().next().children();
            warehouse_control.confirmar_movimiento(
                    '/ware_house/bodega_movimientos/',
                    $(this).attr('data-numero_movimiento'),
                    $(this).attr('id'),
                    text,
                    multiplo_element
            );
//            if (event.data.tipo === 'pallet') {
//                warehouse_control.confirmar_blo_pallets(
//                    '/ware_house/generar_bloque/',
//                    $(this).attr('data-bloque-cod'),
//                    $(this).attr('id').split('_')[1],
//                    text
//                );
//            }
//
//            if (event.data.tipo === 'box') {
//                warehouse_control.confirmar_blo_box(
//                    '/ware_house/bloques/',
//                    $(this).attr('data-bloque-cod'),
//                    $(this).attr('id').split('_')[1],
//                    text,
//                    $(this).attr('data-articulo-cod'),
//                    $(this).attr('data-tipo')
//                );
//            }
        });
    },

    pallet_check_input: function(qs, tipo){
        $(qs).bind('change',{tipo: tipo}, function(event){
            element = $(this);
            var text = $(element).val();
            warehouse_control.confirmar_blo_pallets(
                    '/ware_house/generar_bloque/',
                    $(this).attr('data-bloque-cod'),
                    $(this).attr('id').split('_')[1],
                    text
                );
        });
    },

    bloque_box_distribuicion: function(url, bloque_cod, box_numero, tipo){
        esperar.Wait('body');
        parametros = {
            blo_box_dist_manag: true,
            bloque_cod: bloque_cod,
            box_cod: box_numero,
            tipo: tipo
        }

        $.get(url, parametros, function(response){
              $('#blo_box_dist_manag').html(response);
              esperar.Unwait();
         }, 'html' );
    },


    bloque_rep_distribuicion: function(url, bloque_cod, box_numero, tipo){
        esperar.Wait('body');
        parametros = {
            blo_rep_dist_manag: true,
            bloque_cod: bloque_cod,
            box_cod: box_numero
        }

        $.get(url, parametros, function(response){
              $('#blo_rep_dist_manag').html(response);
              esperar.Unwait();
         }, 'html' );
    },

    print_rep_conf: function(url){
        $.get(url, {print_rep_conf:true}, function(response){
              console.log(response);
              esperar.Unwait();
         }, 'html' );
    },

    borrar_bloque: function(url, bloque_cod) {
        esperar.Wait('body');
        var nhtml_apro = '';
        parametros = {
            borrar_bloque: true,
            bloque_cod: bloque_cod
        }
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert- fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p></p>' +
                                   '</div>';
                      });
                 $('#bloque_'+response.bloque_cod).remove();
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert- fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p></p>' +
                               '</div>';
                   });
               }
               esperar.Unwait();
               notificaciones.noti_popup('', nhtml_apro);
              }, 'json');

    },

    armar_cajas: function(url, pall_numero ){
        esperar.WaitInElement('#panel_palletsmanag_body');
        parametros = {
            armar_cajas: true,
            pall_numero: pall_numero
        }
        $.get(url, parametros, function(response){
            $('#panel_palletsmanag_body').html(response);
            setTimeout(function(){
                  ui_control.hasta_pos('#panel_palletsmanag_body');
                }, 300);
         }, 'html' );
    },

    confirmar_armar_cajas: function(url, pall_numero ){
        esperar.Wait('.body');
        mensajes.ini_arri();
        parametros = {
            confirmar_armar_cajas: true,
            pall_numero: pall_numero
        }
        $.post(url, parametros, function(response){
            if (response.exitos) {
                $.each(response.exitos, function(i, val){
                    mensajes.exitos(val);
                    $('#form_buscar_pallets_rapido').resetForm();
                    $('#form_buscar_pallets_rapido').submit();
                });
            }
            if (response.error) {
                $.each(response.error, function(i, val){
                    mensajes.error(val);
                });
            }
            esperar.Unwait();
         }, 'json' );
    },

    armar_pallets: function(url, pall_numero ){
        esperar.WaitInElement('#panel_palletsmanag_body');
        parametros = {
            armar_pallets: true,
            pall_numero: pall_numero
        }
        $.get(url, parametros, function(response){
            $('#panel_palletsmanag_body').html(response);
            setTimeout(function(){
                  ui_control.hasta_pos('#panel_palletsmanag_body');
                }, 300);
         }, 'html' );
    },


    confirmar_armar_pallets: function(url, pall_numero ){
        esperar.Wait('.body');
        mensajes.ini_arri();
        parametros = {
            confirmar_armar_pallets: true,
            pall_numero: pall_numero
        }
        $.post(url, parametros, function(response){
            if (response.exitos) {
                $.each(response.exitos, function(i, val){
                    mensajes.exitos(val);
                    $('#form_buscar_pallets_rapido').resetForm();
                    $('#form_buscar_pallets_rapido').submit();
                });
            }
            if (response.error) {
                $.each(response.error, function(i, val){
                    mensajes.error(val);
                });
            }
            esperar.Unwait();
         }, 'json' );
    },
    asignar_lote: function(url, pall_numero){
        esperar.WaitInElement('#panel_palletsmanag_body');
        parametros = {
            asignar_lote: true,
            pall_numero: pall_numero
        }
        $.get(url, parametros, function(response){
            $('#panel_palletsmanag_body').html(response);
            setTimeout(function(){
                  ui_control.hasta_pos('#panel_palletsmanag_body');
                }, 300);
         }, 'html' );
    },

    confirmar_asignar_lote: function(url, pall_numero ){
        esperar.Wait('.body');
        mensajes.ini_arri();
        parametros = {
            confirmar_asignar_lote: true,
            pall_numero: pall_numero
        }
        $.post(url, parametros, function(response){
            if (response.exitos) {
                $.each(response.exitos, function(i, val){
                    mensajes.exitos(val);
                    $('#form_buscar_pallets_rapido').resetForm();
                    $('#form_buscar_pallets_rapido').submit();
                });
            }
            if (response.error) {
                $.each(response.error, function(i, val){
                    mensajes.error(val);
                });
            }
            esperar.Unwait();
         }, 'json' );
    },

    marcar_averiados_sueltas: function(url, pall_numero) {
        parametros = {
            marcar_averiados_sueltas: true,
            sueltas: true,
            pall_numero: pall_numero
        }
        $.get(url,
            parametros,
            function(response){
                $("#picking_sueltas_averiados_modal .modal-body").html(response);
                $("#picking_sueltas_averiados_modal").modal();
            }, 'html');
    },
    aprobar_averiados: function(url, pall_numero){
        parametros = {
            aprobar_averiados: true,
            pall_numero: pall_numero
        }
        esperar.Wait('body');
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>EXITOS</p>' +
                                   '</div>';
                      });
                 $('#ave_apro_' + response.pall_numero).remove();
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });
               }
               esperar.Unwait();
               notificaciones.noti_popup('', nhtml_apro);
              }, 'json');
    },
    crear_boegas: function(url){
        parametros = {
            bodega_diseno: true,
            crear_bodega: true
        }
        esperar.Wait('body');
        $.get(url, parametros, function(response){
              $('.panel_bodegas_ui_title').html('CREACION DE BODEGAS');
              $('.panel_bodegas_ui_content').html(response);
              $('.panel_bodegas_ui').show();
              ui_control.hasta_pos('.panel_bodegas_ui');
              esperar.Unwait();
         }, 'html' );
    },
    eliminar_bodegas: function(url) {
        parametros = [
            { name: 'eliminar_bodegas', value: true }
        ];
        bodega_pks = ui_control.traer_marcados_generic('input[name=chpro_list_bodegas]',
                                                       [['bodega_pk', 'data-bodega_pk']]
                                                       );

        if (bodega_pks.length === 0) {
            notificaciones.noti_popu_faster('ERROR',
                'DEBE SELECCIONAR AL MENOS UNA BODEGA',
                'danger');
            return
        }
        Array.prototype.push.apply(parametros, bodega_pks);

        esperar.Wait('body');
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>EXITOS</p>' +
                                   '</div>';
                      });
                 $('a[href=#bodega_diseno_bodegas]').trigger('shown.bs.tab');
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });

               }
               esperar.Unwait();
               notificaciones.noti_popup('INFO', nhtml_apro);
              }, 'json');
    },
    aprobar_bodegas: function(url){
        parametros = [
            { name: 'aprobar_bodegas', value: true }
        ];
        bodega_pks = ui_control.traer_marcados_generic('input[name=chpro_list_bodegas]',
                                                       [['bodega_pk', 'data-bodega_pk']]
                                                       );

        if (bodega_pks.length === 0) {
            notificaciones.noti_popu_faster('ERROR',
                'DEBE SELECCIONAR AL MENOS UNA BODEGA',
                'danger');
            return
        }
        Array.prototype.push.apply(parametros, bodega_pks);

        esperar.Wait('body');
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>EXITOS</p>' +
                                   '</div>';
                      });
                 $('a[href=#bodega_diseno_bodegas]').trigger('shown.bs.tab');
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });

               }
               esperar.Unwait();
               notificaciones.noti_popup('INFO', nhtml_apro);
              }, 'json');
    },

    crear_area: function(url) {
        parametros = {
            bodega_diseno: true,
            crear_area: true
        }
        esperar.Wait('body');
        $.get(url, parametros, function(response){
              $('.panel_bodegas_ui_title').html('CREACION DE AREAS');
              $('.panel_bodegas_ui_content').html(response);
              $('.panel_bodegas_ui').show();
              ui_control.hasta_pos('.panel_bodegas_ui');
              esperar.Unwait();
         }, 'html' );
    },
    listar_celdas: function(url, area_pk) {
        $(".tab_t1").click();
        parametros = {
            bodega_diseno: true,
            listar_celdas: true,
            area_pk: area_pk
        }
        esperar.Wait('body');
        $.get(url, parametros, function(response){
              $('#bloque_distribucion').html(response);
              esperar.Unwait();
         }, 'html' );
    },
    eliminar_area: function(url){
        esperar.Wait('body');
        parametros = [
            {name:'eliminiar_area', value: true }
        ];
        areas = ui_control.traer_marcados_generic('input[name=chpro_list_areas]',
          [['areapk', 'data-area_pk']]
        );

        if (areas.length <= 0){
            mensajes.ini_arri();
            mensajes.error('DEBE SELECCIONAR AL MENOS UN AREA');
            esperar.Unwait();
            return
        }
        Array.prototype.push.apply(parametros, areas);
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>EXITOS</p>' +
                                   '</div>';
                      });
                 $('a[data-target="#bodega_diseno_areas"]').trigger('shown.bs.tab');
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });

               }
               esperar.Unwait();
               notificaciones.noti_popup('MENSAJES', nhtml_apro);
        }, 'json');

    },
    confirmar_movimiento_camion: function(url, bloque_cod,
                                          box_numero, reparto_numero){
        esperar.Wait('body');
        parametros = [
            {name:'blo_rep_dist_manag', value: true },
            {name:'bloque_cod', value: bloque_cod },
            {name:'box_numero', value: box_numero },
            {name:'reparto_numero', value: reparto_numero }
        ];


        articulos = ui_control.traer_marcados_generic('input[name=chpro_conf_camion]',
          [['articulo_cod', 'data-articulo_cod']]
        );


        if (articulos.length <= 0){
            mensajes.ini_arri();
            mensajes.error('DEBE SELECCIONAR UNO O MAS ARTICULOS');
            esperar.Unwait();
            return
        }

        if (articulos.length != $('input[name=chpro_conf_camion]').length) {
            //hay faltantes se bloquea la operacion, hasta que un
            //operador superior decida que hacer
            esperar.Unwait();
            esperar.Wait('body');
            parametros_bloqueo = [
                {name: 'faltantes', value: true},
                {name:'bloque_cod', value: bloque_cod },
                {name:'box_numero', value: box_numero },
                {name:'reparto_numero', value: reparto_numero },
                {name:'etapa', value: 'CONFIRMACION_BOX_CAMION' }
            ];
            Array.prototype.push.apply(parametros_bloqueo, articulos);
            $.get('/ware_house/bloqueo_procesos/', parametros_bloqueo, function(response){
                  $('.generic_modal .modal-body').html(response);
                  $('.generic_modal').modal('show');
                  esperar.Unwait();
             }, 'html' );
            return
        }

        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>EXITOS</p>' +
                                   '</div>';
                      });
                 $('#blo_rep_dist_manag').html('<h1>MOVIMIENTO CONFIRMADO</h1>');
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });

               }
               esperar.Unwait();
               notificaciones.noti_popup('MENSAJES', nhtml_apro);
              }, 'json');
    },
    registrar_productos: function(url, bodega_pk){
        parametros = {
            registrar_productos: true,
            bodega_pk: bodega_pk
        }
        esperar.Wait('body');
        $.get(url, parametros, function(response){
              $('#product_manag_panel .panel-title').html('REGISTRAR PRODUCTOS DESCARGADOS');
              $('#product_manag_panel .panel-body').html(response);
              esperar.Unwait();
         }, 'html' );
    },

    get_proforma: function(url, compra_numero){
        parametros = {
            get_proforma: true,
            compra_numero: compra_numero
        }

        $.get(url, parametros, function(response){
              if (response.exitos) {
                  options = '';
                  $.each(response.proformas, function(i, val) {
                      options +='<option value'+ val +'>' +
                                 val+
                                 '</option>';
                  });
                  warehouse_control.mostrar_detalle_registro('/ware_house/product_manag/', compra_numero);
              }
              if (response.error) {
                  options = '';
                  $('#id_tracto').attr('readonly', false);
                  $('#id_chapa').attr('readonly', false);
                  $('#id_furgon').attr('readonly', false);
                  $('#id_tracto').val('');
                  $('#id_chapa').val('');
                  $('#id_furgon').val('');

              }
              $('#id_pall_proforma_cod').html(options);
         }, 'json' );

    },

    generar_pallets: function(url, compra_numero) {
        parametros = {
            generar_pallets: true,
            compra_numero: compra_numero
        }
        esperar.Wait('body');
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>EXITOS</p>' +
                                   '</div>';
                      });
                 warehouse_control.mostrar_detalle_registro('/ware_house/product_manag/', compra_numero);

              }
              if (response.error) {               
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });
                        
               }
               esperar.Unwait();
               notificaciones.noti_popup('INFO', nhtml_apro);
              }, 'json');
    },
    mostrar_detalle_registro: function(url, compra_numero) {
        parametros = {
            mostrar_detalle_registro: true,
            compra_numero: compra_numero
        }
        esperar.WaitInElement('.mostrar_detalle_registro');
        $.get(url, parametros, function(response){
              $('.mostrar_detalle_registro').html(response);
         }, 'html' );
    },

    anular_registro_item: function(url) {
        esperar.Wait('body');
        parametros = [
            {name:'anular_registro_item', value: true }
        ];
        registro_pk = ui_control.traer_marcados_generic('input[name=chpro_list_pregistro]',
          [['registro_pk', 'data-registro_pk']]
        );

        if (registro_pk.length <= 0){
            mensajes.ini_arri();
            mensajes.error('DEBE SELECCIONAR AL MENOS UN ITEM');
            esperar.Unwait();
            return
        }
        Array.prototype.push.apply(parametros, registro_pk);
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>EXITOS</p>' +
                                   '</div>';
                      });
                 warehouse_control.mostrar_detalle_registro('/ware_house/product_manag/', response.compra_numero);
                 ui_control.hasta_pos('.mostrar_detalle_registro');
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });

               }
               esperar.Unwait();
               notificaciones.noti_popup('MENSAJES', nhtml_apro);
        }, 'json');
    },

    etiquetar_pallets_ui: function(url, bodega_pk){
        parametros = {
            etiquetar_pallets_ui: true,
            bodega_pk: bodega_pk
        }

        esperar.Wait('body');
        $.get(url, parametros, function(response){
              $('#product_manag_panel .panel-title').html('ETIQUTAR PALLETS');
              $('#product_manag_panel .panel-body').html(response);
              esperar.Unwait();
         }, 'html' );
    },
    listar_pallets_completos_ui: function(url, bodega_pk, pagina, ini, fin) {
        parametros = {
            listar_pallets_completos_ui: true,
            bodega_pk: bodega_pk,
            pagina: pagina,
            ini: ini,
            fin: fin

        }

        esperar.WaitInElement('#product_manag_panel .panel-body');
        $.get(url, parametros, function(response){
              $('#product_manag_panel .panel-title').html('PALLETS COMPLETOS');
              $('#product_manag_panel .panel-body').html(response);
         }, 'html' );

    },

    buscar_pallets_pagination: function(pagina, ini, fin) {
        //hace un submit de la pagina seleccionado del resultado del busqueda
        $('#form_buscar_pallets input[name=pagina]').val(pagina);
        $('#form_buscar_pallets input[name=ini]').val(ini);
        $('#form_buscar_pallets input[name=fin]').val(fin);
        $('#form_buscar_pallets button').click();
    },

    listar_pallets_problemas: function(url, bodega_pk) {
        parametros = {
            listar_pallets_problemas: true,
            bodega_pk: bodega_pk
        }

        esperar.Wait('body');
        $.get(url, parametros, function(response){
              $('#product_manag_panel .panel-title').html('PALLETS CON PROBLEMAS DE CALIDAD');
              $('#product_manag_panel .panel-body').html(response);
              esperar.Unwait();
         }, 'html' );

    },

    listar_unidades_sueltas: function(url, bodega_pk, x_lote) {
        parametros = {
            listar_unidades_sueltas: true,
            bodega_pk: bodega_pk
        }

        if (x_lote) {
            parametros[x_lote] = true;
        }

        esperar.Wait('body');
        $.get(url, parametros, function(response){
              $('#product_manag_panel .panel-title').html('UNIDADES SUELTAS');
              $('#product_manag_panel .panel-body').html(response);
              esperar.Unwait();
         }, 'html' );
    },

    listar_unidades_cajas: function(url, bodega_pk, x_lote) {
        parametros = {
            listar_unidades_cajas: true,
            bodega_pk: bodega_pk
        }

        if (x_lote) {
            parametros['x_lote'] = true;
        }

        esperar.Wait('body');
        $.get(url, parametros, function(response){
              $('#product_manag_panel .panel-title').html('CAJAS');
              $('#product_manag_panel .panel-body').html(response);
              esperar.Unwait();
         }, 'html' );
    },

    imprimir_pallets_etiquetas: function(url, pall_proforma, pall_orden_compra, articulo_cod, bodega_cod) {
        esperar.Wait('body');
        var nhtml_apro = '';
        parametros = {
            imprimir_pallets_etiquetas: true,
            pall_orden_compra: pall_orden_compra,
            pall_proforma: pall_proforma,
            articulo_cod: articulo_cod,
            bodega_cod: bodega_cod
        }

        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>EXITOS</p>' +
                                   '</div>';
                      });
                 warehouse_control.etiquetar_pallets_ui('/ware_house/product_manag/', response.bodega_pk);
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });

               }
               esperar.Unwait();
               notificaciones.noti_popup('.', nhtml_apro);
              }, 'json');
    },
    reimprimir_etiquetas_ui: function(url, bodega_pk) {
        esperar.Wait('body');
        parametros = {
            reimprimir_etiquetas: true,
            bodega_pk: bodega_pk
        }
        $.get(url, parametros, function(response){
            $('#bloque_distribucion').html(response);
            esperar.Unwait();
            ui_control.show_stab();
         }, 'html' );
    },

    listar_pallets_control_calidad: function(url, bodega_pk) {
        parametros = {
            listar_pallets_control_calidad: true,
            bodega_pk: bodega_pk
        }

        esperar.Wait('body');
        $.get(url, parametros, function(response){
              $('#product_manag_panel .panel-title').html('PALLETS CONTROL CALIDAD');
              $('#product_manag_panel .panel-body').html(response);
              esperar.Unwait();
         }, 'html' );
    },
    pallet_control_calidad_ui: function(url, pall_numero, bodega_cod) {
        esperar.Wait('body');
        parametros = {
            pallet_control_calidad: true,
            pall_numero: pall_numero,
            bodega_cod: bodega_cod
        }
        $.get(url, parametros, function(response){
              $('#bloque_distribucion').html(response);
              esperar.Unwait();
              ui_control.show_stab();
         }, 'html' );
    },

    listar_productos_movimientos: function(url, bodega_pk,
                                           numero_movimiento,
//                                           articulo_cod,
                                           proforma,
                                           bodega_origen_cod,
                                           bodega_destino_cod,
//                                           box_numero,
                                           bloque_cod,
                                           reparto_numero
        ) {
        parametros = {
            listar_productos_movimientos: true,
            bodega_pk: bodega_pk,
            numero_movimiento: numero_movimiento,
//            articulo_cod: articulo_cod,
            proforma: proforma,
            bodega_origen_cod: bodega_origen_cod,
            bodega_destino_cod: bodega_destino_cod,
//            box_numero: box_numero,
            bloque_cod: bloque_cod,
            reparto_numero: reparto_numero
        }
        esperar.WaitInElement('#product_manag_panel .panel-body');
        $.get(url, parametros, function(response){
              $('#product_manag_panel .panel-title').html('REGISTRO DE MOVIMIENTO REALIZADOS/A REALIZAR');
              $('#product_manag_panel .panel-body').html(response);
         }, 'html' );
    },

    estado_movimientos_bloque: function(url, bloque_cod) {
        clearInterval(lintg);
        parametros = {
            estado_movimientos_bloque: true,
            bloque_cod: bloque_cod
        }
        esperar.WaitInElement('#product_manag_panel .panel-body');
        lintg = setInterval(function(){
            $.get(url, parametros, function(response){
                $('#product_manag_panel .panel-title').html('REGISTRO DE MOVIMIENTO A REALIZAR');
                $('#product_manag_panel .panel-body').html(response);
                $('#form_filtrar_movimientos').hide();
                $('.btn-bodmov').hide();
            }, 'html' );
        }, 5000);
    },

    realizar_productos_movimientos: function(url, movimiento_pk, bodega_pk) {
        parametros = {
            realizar_productos_movimientos: true,
            movimiento_pk: movimiento_pk,
            bodega_pk: bodega_pk
        }
        esperar.WaitInElement('#bloque_distribucion');
        $.get(url, parametros, function(response){
//            $('#bloque_distribucion').html(response);
//              ui_control.show_stab();
            movimiento = $('#movimiento_'+movimiento_pk);
            movimiento.next().children().html(response);
         }, 'html' );
    },
    sumario_producto_movimiento: function(url, movimiento_pk) {
        parametros = {
            sumario_producto_movimiento: true,
            movimiento_pk: movimiento_pk
        }
        esperar.WaitInElement('.detalle_sumario_movimiento');
        $.get(url, parametros, function(response){
            $('#detalle_sumario_movimiento_'+movimiento_pk).html(response);
            esperar.UnwaitInElement();
         }, 'html' );
    },
    productos_averiados: function(url, pall_numero, bodega_cod) {
        esperar.WaitInElement('#bloque_distribucion');
        parametros = {
            productos_averiados: true,
            pall_numero: pall_numero,
            bodega_cod: bodega_cod
        }
        $.get(url, parametros, function(response){
              $('#bloque_distribucion').html(response);
              ui_control.show_stab();
         }, 'html' );
    },
    mover_pallets: function(url, bodega_pk) {
        esperar.WaitInElement('#bloque_distribucion');
        parametros = [
           { name: 'mover_pallets', value: true },
           { name: 'bodega_pk', value: bodega_pk }
        ];
        pallets = ui_control.traer_marcados_generic('input[name=chpro_list_pallets]',
                                                    [['pallets_numeros', 'data-pallet_numero']]
                                                    );
        if (pallets.length === 0) {
            notificaciones.noti_popu_faster('ERROR',
                'DEBE SELECCIONAR AL MENOS UN PALLET',
                'danger');
            return
        }
        Array.prototype.push.apply(parametros, pallets);
        $.get(url, parametros, function(response){
            $('#bloque_distribucion').html(response);
            ui_control.show_stab();
         }, 'html' );
    }
}

invoicing_control = {
    listar_ordenes: function(url){
        parametros = {
            listar_ordenes_impresion: true
        }
        esperar.WaitInElement('#invoicing_main');
        $.get(url, parametros, function(response){
              $('#invoicing_main').html(response);
              esperar.UnwaitInElement('#invoicing_main');
         }, 'html' );
    },
    preview_invoicing: function(url, numero_orden_impresion) {
        esperar.Wait('body');
        parametros = {
            preview_invoicing: true,
            numero_orden_impresion: numero_orden_impresion
        }
        $.get(url, parametros, function(response){
            $('#invoicing_content').html(response);
            ui_control.show_stab();
            esperar.Unwait();
         }, 'html' );

    },
    printing_invoicing: function(url, numero_orden_impresion) {
        parametros = {
            numero_orden_impresion: numero_orden_impresion,
            printing_invoicing: true
        }
        esperar.Wait('body');
        mensajes.ini_arri();
        $.post(url, parametros, function(response){
            if (response.exitos) {
                $.each(response.exitos, function(i, val){
                    mensajes.exitos(val);
                });
                $('#orden_'+ response.numero_orden_impresion).remove();
                $('#boton_orden_'+ response.numero_orden_impresion).remove();
            }
            esperar.Unwait();
         }, 'json' );
    }
}
printing_control = {
    list_imp: function(url, url_print, wait){
        esperar.Wait('body');
        parametros = {
            url_print: url_print,
            wait: wait
        }
        $.get(url, parametros, function(response){
              $('.generic_modal .modal-body').html(response);
              $('.generic_modal').modal('show');
              esperar.Unwait();
         }, 'html' );
    },
    printing: function(url, url_print, printer, wait) {
        esperar.Wait('body');
        parametros = {
            url_print: url_print,
            printer: printer,
            wait: wait

        }
        window.location = url + '?url_print='+url_print+'&printer='+printer+'&wait='+wait;
        esperar.Unwait();
    }
}

gusuo

buy_control = {
    cargar_compras: function(url) {
        $('#dashboard_panel_actions_title').html('OPERACIONES DE COMPRAS');
        esperar.WaitInElement('#dashboard_panel_actions_body');
        parametros = {
            'cargar_compras': true
        }
        $.get(url, parametros, function(response){
            $('#dashboard_panel_actions_body').html(response);
            ui_control.hasta_pos('#dashboard_panel_actions_body');
         }, 'html' );
    },
    listar_solicitudes: function(url) {
        $('#buy_manag_panel_title').html('SOLICITUDES DE COMPRAS');
        esperar.WaitInElement('#buy_manag_panel_body');
        parametros = {
            listar_solicitudes: true
        }
        $.get(url, parametros, function(response){
              $('#buy_manag_panel_body').html(response);
              ui_control.hasta_pos('#buy_manag_panel_body');
         }, 'html' );
    },
    crear_solicitudes: function(url, compra_numero) {
        $('#buy_manag_panel_actions_title').html('CREAR NUEVA SOLICITUD DE COMPRAS '+ compra_numero);
        esperar.WaitInElement('#buy_manag_panel_actions_body');
        parametros = {
            crear_solicitudes: true
        }
        if (compra_numero !== undefined) {
            parametros['compra_numero'] = compra_numero
        }
        $.get(url, parametros, function(response){
            $('#buy_manag_panel_actions_body').html(response);
            ui_control.hasta_pos('#buy_manag_panel_actions_body');
         }, 'html' );
    },
    mostrar_detalle_solicitud: function(url,compra_numero) {
        parametros = {
            mostrar_detalle_solicitud: true,
            compra_numero: compra_numero
        }
        esperar.WaitInElement('#compras_detalle_panel_body');
        $('#compras_detalle_panel_titulo').html('DETALLE COMPRA '+ compra_numero);
        $.get(url, parametros, function(response){
              $('#compras_detalle_panel_body').html(response);
         }, 'html' );
    },
    anular_solicitud_item: function(url) {
        esperar.Wait('body');
        parametros = [
            {name:'anular_solicitud_item', value: true }
        ];
        comprapks = ui_control.traer_marcados_generic('input[name=chpro_list_solicitud]',
          [['comprapks', 'data-compra_pk']]
        );

        if (comprapks.length <= 0){
            mensajes.ini_arri();
            mensajes.error('DEBE SELECCIONAR AL MENOS UN ITEM');
            esperar.Unwait();
            return
        }
        Array.prototype.push.apply(parametros, comprapks);
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>EXITOS</p>' +
                                   '</div>';
                      });
                 buy_control.mostrar_detalle_solicitud('/buy_man/manag_buy/', response.compra_numero);
                 ui_control.hasta_pos('#compras_detalle_panel_body');
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });

               }
               esperar.Unwait();
               notificaciones.noti_popup('MENSAJES', nhtml_apro);
        }, 'json');
    },
    aprobar_solicitudes: function(url, compra_numero) {
        esperar.Wait('body');
        parametros = [
            {name:'aprobar_solicitudes', value: true }
        ];

        if (compra_numero === undefined) {
            compra_numero = ui_control.traer_marcados_generic('input[name=chpro_list_solicitud_l]',
                [['compra_numero', 'data-compra_numero']]
            );

            if (compra_numero.length <= 0){
                mensajes.ini_arri();
                mensajes.error('DEBE SELECCIONAR AL MENOS UN ITEM');
                esperar.Unwait();
                return
            }
            Array.prototype.push.apply(parametros, compra_numero);
        } else {
            parametros.push({name: 'compra_numero', value: compra_numero});
        }


        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>EXITOS</p>' +
                                   '</div>';
                      });
                 buy_control.listar_solicitudes('/buy_man/manag_buy/');
                 buy_control.mostrar_detalle_solicitud('/buy_man/manag_buy/', compra_numero);

              }

              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });

               }
               esperar.Unwait();
               notificaciones.noti_popup('MENSAJES', nhtml_apro);
        }, 'json');
    },
    cargar_despacho: function(url, compra_numero) {
        parametros = [{
            name: 'cargar_despacho', value: true
        }]


        if (compra_numero === undefined) {
            compra_numero = ui_control.traer_marcados_generic('input[name=chpro_list_solicitud_l]',
                [['compra_numero', 'data-compra_numero']]
            );

            if (compra_numero.length <= 0){
                mensajes.ini_arri();
                mensajes.error('DEBE SELECCIONAR AL MENOS UN ITEM');
                esperar.Unwait();
                return
            }
            Array.prototype.push.apply(parametros, compra_numero);
        } else {
            parametros.push({name: 'compra_numero', value: compra_numero});
        }

        $('#buy_manag_panel_actions_title').html('DESPACHO DE LA COMPRA ');
        esperar.WaitInElement('#buy_manag_panel_actions_body');

        $.get(url, parametros, function(response){
            $('#buy_manag_panel_actions_body').html(response);
        }, 'html');
    },

    despacho_ui: function(url, despacho_identificador) {
        parametros = [{ name: 'despacho_ui', value: true },
                      { name: 'despacho_identificador', value: despacho_identificador }
        ];

        $('#buy_manag_panel_actions_title').html('DESPACHO NUMERO ' + despacho_identificador);
        esperar.WaitInElement('#buy_manag_panel_actions_body');
        $.get(url, parametros, function(response){
            $('#buy_manag_panel_actions_body').html(response);
        }, 'html');
    },

    presupuesto_despacho: function(url, despacho_identificador) {
        parametros = [{ name: 'presupuesto_despacho', value: true },
                      { name: 'despacho_identificador', value: despacho_identificador }
        ];

        $('#despacho_actions_panel_title').html('PRESUPUESTO DESPACHO NUMERO ' + despacho_identificador);
        esperar.WaitInElement('#despacho_actions_panel_body');
        $.get(url, parametros, function(response){
            $('#despacho_actions_panel_body').html(response);
        }, 'html');


    },

    mostrar_detalle_despacho: function(url,despacho_identificador) {
        parametros = {
            mostrar_detalle_despacho: true,
            despacho_identificador: despacho_identificador
        }
        esperar.WaitInElement('#despacho_detalle_panel_body');
        $('#despacho_detalle_panel_titulo').html('DETALLE DESPACHO '+ despacho_identificador);
        $.get(url, parametros, function(response){
              $('#despacho_detalle_panel_body').html(response);
         }, 'html' );
    },

    anular_despacho_item: function(url, despachopk) {
        esperar.Wait('body');
        parametros = [
            {name:'anular_despacho_item', value: true }
        ];
        despachopks = ui_control.traer_marcados_generic('input[name=chpro_list_despacho]',
          [['despachopks', 'data-despacho_pk']]
        );

        if (despachopks.length <= 0){
            mensajes.ini_arri();
            mensajes.error('DEBE SELECCIONAR AL MENOS UN ITEM');
            esperar.Unwait();
            return
        }
        Array.prototype.push.apply(parametros, despachopks);
        var nhtml_apro = '';
        $.post(url, parametros, function(response){
             if (response.exitos) {
                $.each(response.exitos, function(i, val){
                     nhtml_apro += '<div class="alert alert-block alert-info fade in">' +
                                   '<button type="button" class="close" data-dismiss="alert">X</button>' +
                                   '<h4 class="alert-heading">'+ val  + '</h4>' +
                                   '<p>EXITOS</p>' +
                                   '</div>';
                      });
                 buy_control.mostrar_detalle_despacho('/buy_man/manag_buy/', response.despacho_identificador);
                 ui_control.hasta_pos('#despacho_detalle_panel_body');
              }
              if (response.error) {
                  $.each(response.error, function(ind, val) {
                         nhtml_apro += '<div class="alert alert-block alert-danger fade in">' +
                               '<button type="button" class="close" data-dismiss="alert">X</button>' +
                               '<h4 class="alert-heading">'+ val + '</h4>' +
                               '<p>ERROR</p>' +
                               '</div>';
                   });

               }
               esperar.Unwait();
               notificaciones.noti_popup('MENSAJES', nhtml_apro);
        }, 'json');
    }
}

repartos_control = {
    reparto_ver_diferencas: function(url, reparto_numero) {
        $('#panel-reparto-diferencias').show();
        esperar.WaitInElement('#panel-reparto-diferencias-body');
        parametros = {
            reparto_ver_diferencias: true,
            reparto_numero: reparto_numero
        }
        $.get(url, parametros, function(response){
              $('#panel-reparto-diferencias-body').html(response);
              esperar.Unwait();
         }, 'html' );
    }
}

common_tools = {
    cotizacion_dna: function(url, fecha) {
        esperar.WaitInElement('#cotizacion_dna');
        parametros = {
            cotizacion_dna: true,
            fecha: fecha
        }
        $.get(url, parametros, function(response){
            if (response.exitos) {
              $('#cotizacion_dna').html(response.table_data);
              $('#cotizacion_dna').prepend('<div class="alert alert-info"><strong>REFERENCIA DE COTIZACION DEL DNA - '+ fecha +'</strong></div>');
              $('input[name=tasa_cambio_dna]').val(response.cotizacion);
                setTimeout(function(){
                    $('#cotizacion_dna table').addClass('table table-bordered');
                },300);
            }
         }, 'json' );
    },

    calculate_money_plus: function(oselector, dselector){
        $(oselector).on('keyup', function(){
            valor = parseFloat($('input[name=tasa_cambio_aco]').val()) * parseFloat($(oselector).val());
            $(dselector).val(valor);
        });
    },
    calculate_money_div: function(oselector, dselector){
        $(oselector).on('keyup', function(){
            valor = parseFloat($(oselector).val()) / parseFloat($('input[name=tasa_cambio_aco]').val()) ;
            $(dselector).val(valor);
        });
    },
    icoterms_sumario: function(url){
        esperar.WaitInElement('.icoterms_sumario');
        $.get(url, { icoterms_sumario: true }, function(response){
            $('.icoterms_sumario').html(response);
        }, 'html' );

    }
}

despachos_control = {
    calculo_cif_aduanero: function(url, compra_numero, origen, flete, seguro, arancel_consular, tasa_cambio_dna){
        parametros = [
            { name: 'calculo_cif_aduanero', value: true },
            { name: 'origen', value: origen },
            { name: 'flete', value: flete },
            { name: 'seguro', value: seguro },
            { name: 'arancel_consular', value: arancel_consular },
            { name: 'tasa_cambio_dna', value: tasa_cambio_dna }
        ]
        $.each(compra_numero, function(i, val) {
            parametros.push({name: 'compra_numero', value: val });
        });

        $.get(url, parametros, function(response){
              $('input[name=tributo_aduanero]').val(response.tributo_aduanero);
               $('#id_cif_aduana').val(response.cif);
               $('#id_valoracion_aduanera').val(response.valoracion_aduanera);
                $('#id_indi').val(response.indi);
        }, 'json' );
    }
}



