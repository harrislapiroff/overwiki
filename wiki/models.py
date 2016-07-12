from __future__ import unicode_literals

import reversion

from django.db import models
from django.core.urlresolvers import reverse


@reversion.register
class Page(models.Model):
    title = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, blank=True, unique=True)
    content = models.TextField()

    def get_absolute_url(self):
        return reverse("page_detail", args=[self.slug])

    def __unicode__(self):
        return self.title
