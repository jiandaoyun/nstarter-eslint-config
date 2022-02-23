pipeline {
    agent {
        node { label 'default' }
    }
    options {
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '3', artifactNumToKeepStr: '3'))
    }
    environment {
        DOCKER_BUILDKIT = "1"
    }
    stages {
        stage('Build') {
            steps {
                sh(script: 'make docker-build')
            }
        }
        stage('Release') {
            steps {
                withCredentials([string(credentialsId: 'npm_release_token', variable: 'token')]) {
                    sh(script: "echo //registry.npmjs.org/:_authToken=${env.token} >> .npmrc")
                    sh(script: 'make docker-release')
                }
            }
        }
    }
    post {
        always {
            script {
                sh(script: 'make clean')
            }
        }
    }
}