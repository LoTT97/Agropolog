#!/bin/sh
# Forced command for the GitHub Actions deploy key on the server (see deploy/README.md).
# Reads a .tar.gz of the site on stdin and makes /var/www/agropolog match it exactly.
set -eu
TARGET=/var/www/agropolog
TMP=$(mktemp -d "$HOME/.agropolog-deploy.XXXXXX")
trap 'rm -rf "$TMP"' EXIT
tar -xzf - -C "$TMP" --no-same-owner --no-same-permissions
test -f "$TMP/index.html" || { echo "deploy: index.html missing, aborting" >&2; exit 1; }
chmod -R u=rwX,go=rX "$TMP"
rsync -a --delete "$TMP/" "$TARGET/"
echo "deploy: $(date -u +%FT%TZ) $(find "$TARGET" -type f | wc -l) files"
