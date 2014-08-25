from django.conf.urls import patterns, include, url
from sbdashboard.views import Dashboard
from sbcommon.genericviews import LoginCaView

urlpatterns = patterns(
    'sbdashboard.views',
    url(r'^$', LoginCaView.as_view(ModuleName='sbdashboard.dashboardmanag',
                                   ClassName='SbLogin',
                                   TemplateGet="sbdashboard/LoginForm.html",
                                   TemplatePost="sbdashboard/Dashborad.html",
                                   ), name='SbLogin'),
    url(r'^ds/(?P<module_name>[\.\w]+)/(?P<class_name>[\.\w]+)/(?P<method_name>[\.\w]+)/$',
        Dashboard.as_view(),
        name='SbDashboard')
    )
