from flask import g, request
from functools import wraps
from shutil import rmtree
from tempfile import mkdtemp
import logging


def dynamodb_client_required(f):
  """
  This decorator automatically creates a K8S client by loading the default
  configuration and initializing the K8S client.
  """

  @wraps(f)
  def decorator(*args, **kwargs):
    # if not g.get('v1', None):
    #   logging.debug("Initializing K8S client...")
    #   config.load_kube_config()
    #   g.v1 = client.CoreV1Api()
    #   logging.debug("K8S client successfully initialized...")
    return f(*args, **kwargs)

  return decorator


def json_request_required(f):
  """
  This decorator will throw a ValueError if the request is not a valid JSON request
  """

  @wraps(f)
  def decorator(*args, **kwargs):
    req = request.json
    if not bool(req):
      raise ValueError('Invalid Request. Must be JSON request')
    return f(*args, **kwargs)

  return decorator


def setup_tempdir(f):
  """
  This decorator will throw a ValueError if the request is not a valid JSON request
  """

  @wraps(f)
  def decorator(*args, **kwargs):
    g.tempdir = mkdtemp()
    logging.debug("Initializing temporary directory to %s", g.tempdir)
    try:
      return f(*args, **kwargs)
    finally:
      try:
        rmtree(g.tempdir)
        logging.debug("Removed temporary directory to %s", g.tempdir)
      except:
        pass

  return decorator
