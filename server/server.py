import os
from os import environ as env
from sys import argv

import bottle
from bottle import sys, route, run, template, get, post, request
import nltk
import mainLogic
import json

@get('/')
def hello():
        return "hello"

@post('/parsetext')
def do_Parsetext():
        para =  request.forms.paragraphs
        #', encoding="utf-8")
        arti = mainLogic.article(para)
        data = arti.main(para,0.5)
        print 'data :',data
        ans ='['
        for k in data:
           ans = ans + json.dumps({k:data[k]}) + ','
        ans = ans+'{}]'
        json_data=ans
        return json_data

port = int(os.environ.get("PORT", 5000))
bottle.run(host='0.0.0.0', port=port)
