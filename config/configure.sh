#! /bin/sh 

if [ "$EUID" -ne 0 ]
    then echo "Please run this script as root"
    exit
fi

cp nginx.conf /etc/nginx/nginx.conf
cp redasm_io.service /etc/systemd/system/
systemctl daemon-reload
