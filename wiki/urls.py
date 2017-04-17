from django.conf.urls import url, include
from django.views.generic import TemplateView
from wiki import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'pages', views.PageViewSet)


urlpatterns = [
    url(r'^api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/', include(router.urls, namespace='wiki')),
    url(r'^.*', TemplateView.as_view(template_name="wiki/app.html")),
]
