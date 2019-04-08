pipeline {
    agent { docker { image 'node:10.15.3' } }
    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'node -v'
                sh 'npm i'
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