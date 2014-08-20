from django.contrib.auth import authenticate, login
from django.core import signing
from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render
from django.template.response import TemplateResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View
import json

class LoginCaView(View):
    template_name = None

    def get(self, request):
        return render(request, 'sbdashboard/LoginForm.html', status=200)

    def post(self, request):
        print request.POST
        return HttpResponse(json.dumps({'exitos': ['LOGIN_CORRECTO']}), mimetype='application/javascript' )


