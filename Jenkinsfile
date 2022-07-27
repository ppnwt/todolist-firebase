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
              npm install
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
          script{
              echo 'SSH to deploy somewhere'
          }
      }
    }

  }//end stages
  
  post {
      always {
          cleanWs()
      }    
  }
}//end pipeline
