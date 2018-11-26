# Expects two command line arguments:
# $1 = FTP_USER
# $2 = FTP_PASSWORD
lftp << EOF
set ssl:verify-certificate/potpourri.frederikheld.de off
open -u $1,$2 potpourri.frederikheld.de
mirror -R ./dist/docs/ /
bye
EOF