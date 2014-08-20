from django.conf.urls import patterns, include, url
from sbcommon.genericviews import  LoginCaView

urlpatterns = patterns('sbdashboard.views',
    url(r'', LoginCaView.as_view(ModuleName='sbdashboard.dashboardmanag',
                                 ClassName='SbLogin',
                                 TemplateGet="sbdashboard/LoginForm.html",
                                 TemplatePost="sbdashboard/SbDashborad.html",
                                 ), name='SbLogin')
)

