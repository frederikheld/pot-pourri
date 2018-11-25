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
            steps {
                echo 'Deploy docs to potpourri.frederikheld.de/docs/ ...'
                withCredentials([usernamePassword(credentialsId: 'deploy-usm.io', usernameVariable: 'FTP_USER', passwordVariable: 'FTP_PW')]) {
                    sh 'build/deploy_docs.sh'
                }
            }
        }
    }
}
