#! /bin/sh

export REDASM_TESTMODE=1
export FLASK_APP=redasm.py
export FLASK_ENV=development 
flask run
