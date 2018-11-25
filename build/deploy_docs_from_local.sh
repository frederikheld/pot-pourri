# Use this script to deploy from your local dev machine. It will take the credentials from .netc.
# Make sure to add .netrc to .gitignore!
# sh 'curl -T dist/docs/* ftp://potpourri.frederikheld.de/ -u $FTP_USER:$FTP_PW --ftp-ssl --insecure'
# sh 'find dist/docs -type f -exec `curl -T {} ftp://potpourri.frederikeld.de/architecture/{} -u $FTP_USER:$FTP_PW --ftp-create-dirs --ftp-ssl --insecure`'
lftp << EOF
set ssl:verify-certificate/potpourri.frederikheld.de off
open --rcfile .netrc potpourri.frederikheld.de
mirror -R ./dist/docs/ /
bye
EOF
# open -u $FTP_USER,$FTP_PASSWORD potpourri.frederikheld.de