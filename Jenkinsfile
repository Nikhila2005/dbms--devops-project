pipeline {
    agent any

    tools {
        nodejs "node20"
    }

    environment {
        IMAGE_NAME = "nikhila2005/nodeapp"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Nikhila2005/dbms--devops-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('SonarQube Scan') {
            steps {

                withSonarQubeEnv('Sonar') {

                    bat '''
                    sonar-scanner
                    '''
                }
            }
        }

        stage('OWASP Dependency Check') {
            steps {

                dependencyCheck(
                    odcInstallation: 'OWASP',
                    additionalArguments: '--scan .'
                )
            }
        }

        stage('Build Node App') {
            steps {

                bat '''
                npm run build
                '''
            }
        }

        stage('Build Docker Image') {
            steps {

                bat '''
                docker build -t %IMAGE_NAME% .
                '''
            }
        }

        stage('Push Docker Image') {

            steps {

                withCredentials([
                    usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                    )
                ]) {

                    bat '''
                    echo %PASS% | docker login -u %USER% --password-stdin

                    docker push %IMAGE_NAME%

                    docker logout
                    '''
                }
            }
        }
    }
}