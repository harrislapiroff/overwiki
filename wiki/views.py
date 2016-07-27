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
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


class WikiContextMixin(object):
    def get_context_data(self, **kwargs):
        context = super(WikiContextMixin, self).get_context_data(**kwargs)
        context['pages'] = Page.objects.all()
        return context


class PageView(WikiContextMixin, DetailView):
    model = Page

    def get(self, *args, **kwargs):
        try:
            self.object = self.get_object()
        except Http404:
            # TODO: This should probably redirect to a create page with title
            # and slug prefilled
            return redirect("page_create")
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)

    def get_context_object_name(self, obj):
        return 'page'


class PageUpdateView(RevisionMixin, WikiContextMixin, UpdateView):
    model = Page
    fields = ['title', 'content']

    def get_context_object_name(self, obj):
        return 'page'


class PageCreateView(RevisionMixin, WikiContextMixin, CreateView):
    model = Page
    fields = ['title', 'slug', 'content']
