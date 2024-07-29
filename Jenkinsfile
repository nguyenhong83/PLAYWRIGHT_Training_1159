pipeline {
    agent any
     tools {
        nodejs "node"
        }
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/nguyenhong83/PLAYWRIGHT_Training_1159']])
            }
        }
        stage('Install') {
            steps {
                sh '''
                    npm i -D @playwright/test && npx playwright install
            '''
            }
        }
        stage('Testing') {
            steps {
                sh '''
                    npx playwright test Assignment5.spec.ts --project=chromium
                '''
            }
        }
    }
}
