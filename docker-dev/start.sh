#!/bin/bash

cd $(dirname $0)

set -e

sudo -E docker compose up -d
