pipeline {
    agent any

    tools {
        nodejs 'Node 18'
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}
