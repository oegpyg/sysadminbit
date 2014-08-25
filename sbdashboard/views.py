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
    # TemplateGet = None
    # ModuleName = None
    # ClassName = None
    @method_decorator(login_required)
    def get(self, request, *args, **kwargs):
        SbLModule = importlib.import_module(kwargs.get('module_name'))
        SbLClass = getattr(SbLModule, kwargs.get('class_name'))(username=request.user.username)
        SbLMethod = getattr(SbLClass, kwargs.get('method_name'))
        # return SbLClass.load_profile(request)
        return SbLMethod(request)

    def post(self, request, *args, **kwargs):
        SbLModule = importlib.import_module(kwargs.get('module_name'))
        SbLClass = getattr(SbLModule, kwargs.get('class_name'))(username=request.user.username)
        SbLMethod = getattr(SbLClass, kwargs.get('method_name'))
        # return SbLClass.load_profile(request)
        return SbLMethod(request)

