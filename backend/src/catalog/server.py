#!/bin/python
"""
"""

from flask import request, jsonify
from flask.app import Flask
from flask_cors.extension import CORS
from functools import partial
from os.path import dirname
import logging
from catalog.decorators import json_request_required
from catalog.api import api_list_catalogs, api_add_catalog, api_get_catalog,\
  api_update_catalog, api_delete_catalog

logging.basicConfig(level=logging.INFO)


app = Flask(__name__, static_url_path='', static_folder=dirname(__file__))
CORS(app)


@app.route('/')
def index():
  return app.send_static_file('index.html')


@app.route("/heartbeat")
def heartbeat():
  return jsonify({"status": "healthy"})


@app.errorhandler(ValueError)
def error_handler_invalid_request(e):
  return jsonify({'error': str(e)}), 400


@app.errorhandler(Exception)
def error_handler_server_error(e):
  logging.error(e, exc_info=True)
  return jsonify({'error': str(e)}), 500


@app.route('/api/catalogs', methods=['GET', 'POST'])
def api_catalogs():
  methods = {
      'GET': api_list_catalogs,
      'POST': api_add_catalog,
  }
  return methods[request.method]()


@app.route('/api/catalogs/<catalog_name>', methods=['GET', 'PUT', 'DELETE'])
def api_catalog(catalog_name):
  methods = {
      'GET': api_get_catalog,
      'PUT': api_update_catalog,
      'DELETE': api_delete_catalog,
  }
  return methods[request.method](catalog_name)
