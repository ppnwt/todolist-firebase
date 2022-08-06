def remote = [:]
remote.name = "myjenkinsBuild"
remote.host = "139.180.141.237"
remote.allowAnyHosts = true

pipeline {
  // change to docker later
  agent any
    tools {
      nodejs '16.15.1'
    }
    
  environment {
      HOME = '.'
  }

  stages {
    stage('Information') {
      steps {
        sh 'node -v'
        sh 'npm -v'
      }
    }

    stage('checkout scm') {
      steps {
        script{
          sh script: '''
              cd $WORKSPACE/
              '''
          git branch: 'main', refspec: '+refs/tags/v*:refs/remotes/origin/tags/v*', url: 'https://github.com/newzpanuwat/todolist-firebase'
        }
      }
    }

    stage('Install Dependencies') {
      steps {
          script{
              sh script: '''
              cd $WORKSPACE/
              ls -l
              npm install --production
              '''
          }
      }
    }

    stage("Build"){
      steps {
          script{
              sh script: '''
              cd $WORKSPACE/
              npm run build
              '''
          }
      }
    }

    stage("files compressing"){
      steps {
        script{
          sh script: '''
          whoami
          cd $WORKSPACE && mkdir todolist-firebase && ls -l
          mv build/ ./todolist-firebase/
          tar czvf todolist-firebase.tar.gz ./todolist-firebase ; ls -l
          '''
        }
      }
    }

    stage("Deployment ssh to Deploy server"){
      steps {
        withCredentials([usernamePassword(credentialsId: 'rootdeploy-id', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
            sh '''
                set +x
                    echo "#################################################################"
                    echo "#Deployment"
                    echo "#################################################################"
                pwd
                ls -ltr
              '''
              
                script{
                  remote.user = USERNAME
                  remote.password = PASSWORD
                  sshCommand remote: remote, command: 'ls -ltr'
                }
                sshCommand remote: remote, command: 'rm -rf todolist-firebase.tar.gz ; rm -rf todolist-firebase'
                sshPut remote: remote, from: './todolist-firebase.tar.gz/', into: '.'
                sshCommand remote: remote, command: 'chown -R root:root todolist-firebase.tar.gz'
                sshCommand remote: remote, command: 'ls -l ; tar -xvf todolist-firebase.tar.gz'
                sshCommand remote: remote, command: 'chown -R root:root todolist-firebase'
                sshCommand remote: remote, command: 'rm -rf todolist-firebase.tar.gz'
                sshCommand remote: remote, command: 'pm2 restart todolist'
                // pm2 serve build/ --name "todolist" 3000 --spa
        }
      }
    }
  }
  post {
    always {
        cleanWs()
    }    
  }
}//end pipeline
