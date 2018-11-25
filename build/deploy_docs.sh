lftp << EOF
set ssl:verify-certificate/potpourri.frederikheld.de off
open -u $FTP_USER,$FTP_PASSWORD potpourri.frederikheld.de
mirror -R ./dist/docs/ /
bye
EOF
open -u $FTP_USER,$FTP_PASSWORD potpourri.frederikheld.de