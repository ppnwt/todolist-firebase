def remote = [:]
remote.name = "myjenkinsBuild"
remote.host = "139.180.141.237"
remote.allowAnyHosts = true

pipeline {
  agent {
    docker {
      image 'node:16.15.1'
    }
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
           git branch: 'main', url: 'https://github.com/newzpanuwat/todolist-firebase'
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
              cd $WORKSPACE && mkdir todolist-firebase && ls -l
              mv node_modules/ build/ public/ src/ package.json ./todolist-firebase/
              cd .. && ls -l && tar cvzf todolist-firebase.tar.gz ./todolist-firebase/ && ls -l
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
                ls -l
              '''
              
                script{
                  remote.user = USERNAME
                  remote.password = PASSWORD
                  sshCommand remote: remote, command: 'ls -l'
                }//script
                sshCommand remote: remote, command: 'rm -rf todolist-firebase.tar.gz ; rm -rf todolist-firebase'
                sshPut remote: remote, from: './todolist-firebase.tar.gz/', into: '.'
                sshCommand remote: remote, command: 'chown -R root:root todolist-firebase.tar.gz'
                // sshCommand remote: remote, command: 'ls -l ; tar -xvf todolist-firebase.tar.gz'
                // sshCommand remote: remote, command: 'cd todolist-firebase ; ls -l'
                // sshCommand remote: remote, command: 'pm2 restart todolist-firebase''
                
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
