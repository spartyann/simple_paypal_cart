#!/bin/bash

export XDEBUG_CLIENT_IP="$(ip -4 addr show docker0 | grep -Po 'inet \K[\d.]+')"
