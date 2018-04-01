"""
Django settings for overwiki project.
"""

from .base import *

SECRET_KEY = "NOTASECRET"
DEBUG = True

ALLOWED_HOSTS = []

try:
    from .local_settings import *  #
except:
    pass
