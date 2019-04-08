pipeline {
    agent any
    tools {nodejs "node"}
    stages {
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'node') {
                    echo 'Building...'
                    sh 'node -v'
                    sh 'npm i'
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                sh 'npm run format:dry'
                sh 'npm run types'
                sh 'npm run test:ci'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}