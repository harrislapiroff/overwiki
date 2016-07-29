from .base import *

SECRET_KEY = "NOTAREALSECRET"

try:
    from .local_settings import *
except ImportError:
    pass
