/**
 * Created by peter on 8/20/14.
 */
var SbUtils = {
    UserInterface: {
        hidecontrols: function(ids){
            $(ids).hide();
        },
        debuttons: function(selector, action){
            $(selector).prop(action, true);
        },
        WaitInElement: function (ele) {
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
        },
        UnwaitInElement: function(){
            $('.cubrir_ov').remove();
        },

        Wait: function(ele) {
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

        Unwait: function(){
            $('#cubrir_ov').remove();
        },

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

    },
    Form: {
        form_json: function(arr){
            newo = {};
            $.each(arr, function(i, item){
                newo[item.name] = item.value;
            });
            return newo;
        },
        no_enter: function(classname) {
            $(classname).keypress(function(e){
                if ( e.which == 13 ) return false;
                if ( e.which == 13 ) e.preventDefault();
            });
        },
        spaceout: function(selector){
             $(selector).on({
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
    },
    DayTime: {
        diac: function (){
            dateo = new Date();
            var curr_date = dateo.getDate();
            var curr_month = dateo.getMonth() + 1; //Months are zero based
            var curr_year = dateo.getFullYear();
            return curr_date + "/" + curr_month + "/" + curr_year
        },
        diai: function (plus_day){
            dateo = new Date();
            var curr_date = dateo.getDate();
            if (plus_day != undefined){
                curr_date += plus_day
            }
            if (curr_date.toString().length != 2 ) {
                curr_date = '0'+curr_date;
            }
            var curr_month = dateo.getMonth() + 1; //Months are zero based
            var curr_year = dateo.getFullYear();
            return curr_year + "-" + curr_month + "-" + curr_date;
        },
        horac: function (){
            dateo = new Date();
            var hora = dateo.getHours();
            var minutos = dateo.getMinutes();
            var segundos = dateo.getSeconds();
            return hora + ":" + minutos + ":" + segundos
        }
    },

    Table: {
        bt_tables: function(id_tabla){
            $.extend($.tablesorter.themes.bootstrap, {
                table      : 'table table-bordered',
                caption    : 'caption',
                header     : 'bootstrap-header',
                footerRow  : '',
                footerCells: '',
                icons      : '',
                sortNone   : 'bootstrap-icon-unsorted',
                sortAsc    : 'icon-chevron-up glyphicon glyphicon-chevron-up',
                sortDesc   : 'icon-chevron-down glyphicon glyphicon-chevron-down',
                active     : '',
                hover      : '',
                filterRow  : '',
                even       : '',
                odd        : ''
            });

            $(id_tabla).tablesorter(
                {
                    theme : "bootstrap",
                    widthFixed: true,
                    headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!
                    widgets : [ "uitheme", "filter", "zebra" ],
                    widgetOptions : {
                        zebra : ["even", "odd"],
                        filter_reset : ".reset"
                    }
                }
            ).tablesorterPager({
                    container: $(".ts-pager"),
                    cssGoto  : ".pagenum",
                    removeRows: false,
                    output: '{startRow} - {endRow} / {filteredRows} ({totalRows})'
                });
        },
        big_tables: function(id_tabla){
            $.extend($.tablesorter.themes.bootstrap, {
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
                    theme : "bootstrap",
                    widthFixed: true,
                    headerTemplate : '{content} {icon}', // new in v2.7. Needed to add the bootstrap icon!
                    // widget code contained in the jquery.tablesorter.widgets.js file
                    // use the zebra stripe widget if you plan on hiding any rows (filter widget)
                    widgets : [ "uitheme", "filter", "zebra"],
                    widgetOptions : {
                        zebra : ["even", "odd"],
                        // reset filters button
                        filter_reset : ".reset"

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
    },
    Shortcuts: function(selector, type)
    {
        $(window).bind('keydown', function(event) {
            if (event.ctrlKey || event.metaKey) {
                switch (String.fromCharCode(event.which).toLowerCase()) {
//                case 's':
//                    event.preventDefault();
//                    alert('ctrl-s');
//                    break;
                case 'f':
                    event.preventDefault();
                    if (type === 'focus') {
                        $(selector).focus();
                    } else {
                        null;
                    }

                    break;
//                case 'g':
//                    event.preventDefault();
//                    alert('ctrl-g');
//                    break;
                }
            }
        });
    },
    Dragg: function(selector) {
        $(selector).draggable();
    },
    EffectsSH: function(selector, sEffect, type) {
          // most effect types need no options passed by default
          var options = {};
          // some effects have required parameters
          if ( sEffect === "scale" ) {
            options = { percent: 100 };
          } else if ( sEffect === "size" ) {
            options = { to: { width: 280, height: 185 } };
          }
          // run the effect
        if (type === 'show') {
            $(selector).show( sEffect,options,500);
        } else {
            $(selector).hide( sEffect,options,500);
        }

    }
}
