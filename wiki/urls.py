from django.conf.urls import url, include
from django.views.generic import TemplateView
from wiki import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'pages', views.PageViewSet)


urlpatterns = [
    url(r'^react/.*', TemplateView.as_view(template_name="wiki/react_client.html")),
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/', include(router.urls, namespace='wiki')),
    url(r'^new/$', views.PageCreateView.as_view(), name='page_create'),
    url(r'^(?P<slug>[-\w]*)/$', views.PageView.as_view(), name='page_detail'),
    url(r'^(?P<slug>[-\w]*)/edit/$', views.PageUpdateView.as_view(), name='page_update'),
    url(r'^(?P<slug>)$', views.PageView.as_view()),
]
