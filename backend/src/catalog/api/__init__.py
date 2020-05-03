from catalog.consts import AFB_APP_WAS85_LABEL, AFB_APP_NS_LABEL_SELECTOR, \
    AFB_APP_ORA12C_LABEL
from catalog.decorators import json_request_required, setup_tempdir
from catalog.exceptions import NotReadyError
from catalog.utils import str2bool
from flask import Flask, g, request, jsonify
from os.path import join
from shutil import which
from subprocess import run
import logging
import boto3
import json
import decimal

dynamodb = boto3.resource('dynamodb', region_name='eu-west-1')
table = dynamodb.Table('Catalogs')


class DecimalEncoder(json.JSONEncoder):
  def default(self, o):
    if isinstance(o, decimal.Decimal):
      if o % 1 > 0:
        return float(o)
      else:
        return int(o)
    return super(DecimalEncoder, self).default(o)


def api_list_catalogs():
  response = table.scan(ProjectionExpression="CatalogName")
  catalogs = []
  for i in response['Items']:
    catalogName = i['CatalogName']
    if catalogName not in catalogs:
      catalogs.append(catalogName)
  catalogs = list(map(lambda s: { 'name': s, 'description': '' }, catalogs))
  return jsonify({'catalogs': catalogs, 'total': len(catalogs)}), 200


@json_request_required
def api_add_catalog(app):
  # curl -H "Content-Type: application/json" -X POST --data
  # '{"CatalogName": "Langugage", "Key":"aa", "Value": "Afar" }'
  # http://127.0.0.1:5000/api/catalogs
  CatalogName = request.json.get('CatalogName', None)
  Key = request.json.get('Key', None)
  Value = request.json.get('Value', None)
  try:
    response = table.put_item(
        Item={
            'year': year,
            'title': title,
            'info': {
                'plot': "Nothing happens at all.",
                'rating': decimal.Decimal(0)
            }
        }
    )
  except ClientError as e:
    raise Exception(e.response['Error']['Message'])
  else:
    item = response['Item']
    return json.dumps(item, indent=4, cls=DecimalEncoder), 200


def api_get_catalog(catalog_name):
  # curl -X GET http://127.0.0.1:5000/api/catalogs/Language
  try:
    response = table.get_item(
        Key={'CatalogName': catalog_name, 'Key': 'aa'})
  except ClientError as e:
    raise Exception(e.response['Error']['Message'])
  else:
    item = response['Item']
    return json.dumps(item, indent=4, cls=DecimalEncoder), 200


@json_request_required
def api_update_catalog(catalog_name):
  # curl -H "Content-Type: application/json" -X POST --data
  # '{"value":"New Value"}'
  # http://127.0.0.1:5000/api/catalogs/Langugage
  table.update_item(
      Key={'CatalogName':  catalog_name, 'Key': 'aa'},
      UpdateExpression="set Value = :v",
      ExpressionAttributeValues={':v': request.json.get('value', '')})
  return "OK", 200


def api_delete_catalog(catalog_name):
  # curl -X POST http://127.0.0.1:5000/api/catalogs/Langugage
  try:
    table.delete_item(Key={'CatalogName': catalog_name, 'Key': 'aa'})
  except ClientError as e:
    raise Exception(e.response['Error']['Message'])
  else:
    return "OK", 200
