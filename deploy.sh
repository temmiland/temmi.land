#!/usr/bin/env bash

set -e

# --pull/--no-cache: otherwise Docker reuses the cached `apk upgrade` /
# `apt-get upgrade` layers (the RUN line never changes) and the image keeps
# shipping whatever package versions were current on the first build.
docker compose build --pull --no-cache
docker compose up -d
