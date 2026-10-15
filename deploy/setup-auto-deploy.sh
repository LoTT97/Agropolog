#!/bin/sh
# One-time setup for automatic deploys from GitHub Actions to dolosia.com.
# Run from the project root on a machine with the `dolosia` SSH host and `gh` logged in:
#   sh deploy/setup-auto-deploy.sh
set -eu
REPO=LoTT97/Agropolog
HOST_IP=109.205.178.198
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# 1. A key used only by GitHub Actions (not your personal key).
ssh-keygen -q -t ed25519 -N "" -C "agropolog-github-actions-deploy" -f "$TMP/deploy_key"

# 2. Install the deploy script on the server.
ssh dolosia 'mkdir -p ~/bin'
scp -q deploy/agropolog-deploy.sh dolosia:bin/agropolog-deploy
ssh dolosia 'chmod 755 ~/bin/agropolog-deploy'

# 3. Authorize the key, restricted to running that script only (no shell, no forwarding).
LINE="restrict,command=\"/home/ubuntu/bin/agropolog-deploy\" $(cat "$TMP/deploy_key.pub")"
printf '%s\n' "$LINE" | ssh dolosia 'cat >> ~/.ssh/authorized_keys'

# 4. Store the private key and the server's host keys as GitHub secrets.
gh secret set DEPLOY_SSH_KEY --repo "$REPO" < "$TMP/deploy_key"
ssh-keyscan -t ed25519,ecdsa,rsa "$HOST_IP" 2>/dev/null | gh secret set DEPLOY_KNOWN_HOSTS --repo "$REPO"

echo "Done. The private key now exists only as the DEPLOY_SSH_KEY secret on GitHub."
