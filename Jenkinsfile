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

    stage("tar files files build"){
      steps {
          script{
              sh script: '''
              cd $WORKSPACE && mkdir todolist-firebase && ls -l
              mv build/ public/ src/ package.json ./todolist-firebase/ && cd todolist-firebase &&  ls -l
              cd .. && ls -l && tar cvzf todolist-firebase.tar.gz ./todolist-firebase/ && ls -l
              '''
          }
      }
    }

    stage("ssh deploy stage"){
      steps {
        withCredentials([usernamePassword(credentialsId: 'rootdeploy-id', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
          // available as an env variable, but will be masked if you try to print it out any which way
          // note: single quotes prevent Groovy interpolation; expansion is by Bourne Shell, which is what you want
          sh 'echo $PASSWORD'
          // also available as a Groovy variable
          echo USERNAME
          // or inside double quotes for string interpolation
          echo "username is $USERNAME"
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
                sshCommand remote: remote, command: 'ls -l ; tar -xvf todolist-firebase.tar.gz ; cd todolist-firebase ; ls -l'
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
