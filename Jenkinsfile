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

                    bat """
                    ${tool('sonar-scanner')}\\bin\\sonar-scanner.bat
                    """

                }
            }
        }

        stage('Trivy File System Scan') {
            steps {

                bat '''
                "C:\\Users\\nikhi\\AppData\\Local\\Microsoft\\WinGet\\Packages\\AquaSecurity.Trivy_Microsoft.Winget.Source_8wekyb3d8bbwe\\trivy.exe" fs . --format table > trivy-report.txt
                '''

            }
        }

        stage('Archive Trivy Report') {
            steps {

                archiveArtifacts(
                    artifacts: 'trivy-report.txt',
                    fingerprint: true
                )

            }
        }

        stage('Build Node App') {
            steps {

                bat '''
                npm run build || exit 0
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

    post {

        success {

            echo 'Pipeline completed successfully'

        }

        failure {

            echo 'Pipeline failed'

        }

        always {

            archiveArtifacts(
                artifacts: 'trivy-report.txt',
                allowEmptyArchive: true
            )

        }
    }
}