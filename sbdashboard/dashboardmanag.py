from django.shortcuts import render
from django.contrib.auth import login, authenticate
from django.contrib.auth.decorators import login_required

__doc__ = """Manejador de la pizarra principal de cada usuario"""
from core.decorators import accessprofile

class SbLogin(object):
    def authenticate(self, request):
        user = authenticate(username=request.POST.get('username'),
                            password=request.POST.get('password'))

        if user is not None:
            login(request, user)
            return True
        else:
            return False

class SbDashboard(object):
    def __init__(self, *args, **kwargs):
        self.username = kwargs.get('username')

    @accessprofile
    def load_profile(self, request, **kwargs):
        return render(request, 'sbdashboard/Dashboard.html', kwargs)
