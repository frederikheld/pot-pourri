pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
            echo "Install dependencies ..."
            sh 'npm install'
            }
        }
        stage('Compile documentation') {
            steps {
                echo 'Render architecture'
                sh 'npm run docs'
            }
        }
        stage('Deploy documentation') {
            stepS {
                echo 'Deploy docs to potpourri.frederikheld.de/docs/ ...'
                withCredentials([usernamePassword(credentialsId: 'deploy-usm.io', usernameVariable: 'FTP_USER', passwordVariable: 'FTP_PW')]) {
                    // sh 'curl -T dist/docs/* ftp://potpourri.frederikheld.de/ -u $FTP_USER:$FTP_PW --ftp-ssl --insecure'
                    sh 'find dist/docs -type f -exec curl -u $FTP_USER:$FTP_PW --ftp-create-dirs --ftp-ssl --insecure -T {} ftp://potpourri.frederikeld.de/docs/architecture{}'
                }
            }
        }
    }
}
