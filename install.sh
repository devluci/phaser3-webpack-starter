#!/bin/bash

proj_name="phaser3-webpack-starter"

home="/home/devluci"
proj="${home}/${proj_name}"

nginx="/etc/nginx/sites-enabled"

sudo apt update --fix-missing
sudo apt install nginx -y

sudo rm ${nginx}/default ${nginx}/nginx_default.conf -f
sudo cp ${proj}/nginx/nginx_default.conf ${nginx}/
sudo ln -s ${proj}/nginx/${proj_name}.nginx.conf ${nginx}/

sudo service nginx reload

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install lts/erbium

npm install
npm run build
