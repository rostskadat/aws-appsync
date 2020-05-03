#!/bin/bash


source ~/.local/share/virtualenvs/aws-appsync-catalog-yh6AiTpd/bin/activate
export PYTHONPATH=${PYTHONPATH}:$(dirname $0)/backend/src
export FLASK_APP=backend/src/catalog/server.py
export FLASK_ENV=development
flask run &
ng serve --watch --poll=2000
