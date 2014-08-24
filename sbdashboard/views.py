from django.contrib.auth import authenticate, login
from django.core import signing
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.template.response import TemplateResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View, TemplateView
#utilizado para decorador las vistas clasicas
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

import json
import importlib


class Dashboard(View):
    TemplateGet = None
    ModuleName = None
    ClassName = None

    @method_decorator(login_required)
    def get(self, request):
        SbLModule = importlib.import_module(self.ModuleName)
        SbLClass = getattr(SbLModule, self.ClassName)(username=request.user.username)

        return SbLClass.load_profile(request)

        # return render(request,
        #               self.TemplateGet,
        #               status=200)

    def post(self, request):
        pass

#@csrf_exempt
#def WSmodules(request):
#    modules = {'Standard': [], 'Ventas': []}
#    #modules['Standard'] = []
#    for j, k in modules.iteritems():
#        for model in get_models(get_app(j)):
#            if "__DataSearch__" in dir(model):
#                #l = model()
#                #modules[j].append([model.__name__, l.DataSearch()])
#                modules[j].append([model.__name__, model.__DataSearch__])
#    data = json.dumps(modules)
#    return HttpResponse(data, mimetype='application/json')

