from django.contrib.auth import authenticate, login
from django.core import signing
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render, redirect, urlresolvers, resolve_url
from django.template.response import TemplateResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
from sbdashboard.forms import LoginForm
import json
import importlib

class LoginCaView(View):
    TemplatePost = None
    TemplateGet = None
    ModuleName = None
    ClassName = None

    def get(self, request):
        return render(request,
                      self.TemplateGet,
                      {'LoginForm': LoginForm},
                      status=200)

    def post(self, request):
        SbLModule = importlib.import_module(self.ModuleName)
        SbLClass = getattr(SbLModule, self.ClassName)()

        if SbLClass.authenticate(request):
            # kwargs = {'module_name': 'sbdashboard.dashboardmanag',
            #           'class_name':'SbDashboard',
            #           'method_name':'load_profile'}
            nurl = resolve_url('SbDashboard',
                'sbdashboard.dashboardmanag',
                'SbDashboard',
                'load_profile'
            )

            return redirect(nurl)
        else:
            lg = LoginForm({'username': None, 'password': None})

            return render(request,
                      self.TemplateGet,
                      { 'LoginForm':  lg },
                      status=200)






