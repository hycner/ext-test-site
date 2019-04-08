pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                npm i
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                npm run format:dry
                npm run types
                npm run test:ci
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}