pipeline {
    agent {
        label 'master' // Use the label of the Jenkins built-in node
    }

    parameters {
        string(defaultValue: 'main', description: 'enter the branch name to deploy', name: 'branch')
        string(description: 'enter the rev_ver', name: 'REV_VER')
    }


    stages {
         stage('Prepare environment'){
          steps {
                script {
                    env.BRANCH_PARAM_COPY = "${branch}"
                    env.REV_VER_PARAM_COPY = "${REV_VER}"
                }
            }
        }

        stage("Backup code") {
        steps {
            script {
                // Save the current branch and commit hash
                def branch = params.branch
                def commit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()

                // Connect to the server and backup the code
                withCredentials([usernamePassword(credentialsId: 'robot-server-login', usernameVariable: 'SSH_USERNAME', passwordVariable: 'SSH_PASSWORD')]) {
                    sh """
                        sshpass -p $SSH_PASSWORD ssh -o StrictHostKeyChecking=no $SSH_USERNAME@176.9.62.19 -p 2290 '
                        cd /mnt &&
                        rm -rf /mnt/backups/i69-website-frontend.tar.gz &&
                        tar -czvf /mnt/backups/i69-website-frontend.tar.gz i69-website-frontend
                        '
                    """
                }
            }
        }
    }
    
        stage("Deploy code to main server") {
            steps {
                script {
                    // Save the current branch and commit hash
                    def branch = params.branch
                    def commit = sh(returnStdout: true, script: 'git rev-parse HEAD').trim()

                    // Connect to the server and deploy the code
                    withCredentials([usernamePassword(credentialsId: 'robot-server-login', usernameVariable: 'SSH_USERNAME', passwordVariable: 'SSH_PASSWORD')]) {
                        sh """
                            sshpass -p $SSH_PASSWORD ssh -o StrictHostKeyChecking=no $SSH_USERNAME@176.9.62.19 -p 2290 '
                            cd /mnt &&
                            rm -rf i69-website-frontend &&
                            git clone https://${params.GIT_CREDENTIAL}@gitlab.i69app.com/dev-center/i69-website-frontend.git &&
                            cd i69-website-frontend &&
                            git fetch && git pull &&
                            git checkout ${params.branch} &&
                            git reset --hard ${params.REV_VER} &&
                            docker build -t landing:develop . &&
                            docker stop landing || true && docker rm landing || true &&
                            docker run -d --name=landing -p 3002:3000 landing:develop
                            '
                        """
                    }
                }
            }
        }

    
    }

   post {
        always{
             cleanWs()
        }
    }


}
