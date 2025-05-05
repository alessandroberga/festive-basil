#!/usr/bin/env bash

set -e
set -o pipefail
set -v

gatsby build
./inject-netlify-identity-widget.js public
