from django.views.generic import DetailView, UpdateView, CreateView
from django.shortcuts import redirect
from django.http import Http404
from rest_framework import viewsets
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from reversion.views import RevisionMixin
from wiki.models import Page
from wiki.serializers import PageSerializer


class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    lookup_field = 'slug'
