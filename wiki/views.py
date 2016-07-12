from django.views.generic import DetailView, UpdateView, CreateView
from rest_framework import viewsets
from reversion.views import RevisionMixin
from wiki.models import Page
from wiki.serializers import PageSerializer


class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all()
    serializer_class = PageSerializer


class WikiContextMixin(object):
    def get_context_data(self, **kwargs):
        context = super(WikiContextMixin, self).get_context_data(**kwargs)
        context['pages'] = Page.objects.all()
        return context


class PageView(WikiContextMixin, DetailView):
    model = Page

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
