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
    //definime como es la url para traer los modulos disponibles
    var l = window.location;
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: l.protocol + '//' + l.host + '/WSmodules/',
        success: function(data){
            modules = data;
        }
    });
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

