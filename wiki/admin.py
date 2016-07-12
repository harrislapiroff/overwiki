from django.contrib import admin
from wiki.models import Page

admin.site.register(Page, admin.ModelAdmin)
