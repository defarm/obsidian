#!/bin/python3

import json

def import_file(f):
	with open("f", "r") as f:
		data = json.load(f)
		data.split()
