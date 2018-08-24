#!/bin/bash

mkdir -p img
mkdir -p upload
mkdir -p ssl

openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./ssl/server.key -out ./ssl/server.crt
