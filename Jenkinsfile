pipeline {
  agent {
    node {
      label 'docker-agent'
    }
  }

//   // using the Timestamper plugin we can add timestamps to the console log
//   options {
//     timestamps()
//   }

  environment {
    // The following variable is required for a Semgrep AppSec Platform-connected scan:
    // 6a24fa008adf86f8a2ba70af6d82f91cec39c91e032b6d934534b51e08a40ef0
    SEMGREP_APP_TOKEN = credentials('SEMGREP_APP_TOKEN')
  }

  stages {
    stage('Build') {
        steps {
            echo 'Building..'
            sh 'pip --version'
            sh 'semgrep --version'
            echo 'Build completed.'
        }
    }

    stage('Semgrep-Scan') {
        steps {
          // sh 'pip3 install semgrep'
          // sh 'python3 -m pip install semgrep'
          sh 'semgrep ci'
      }
    }

    // stage('OWASP Dependency-Check Vulnerabilities') {
    //   steps {
    //     dependencyCheck additionalArguments: '''
    //                 -o './'
    //                 -s './'
    //                 -f 'ALL'
    //                 --prettyPrint''', odcInstallation: 'OWASP Dependency-Check Vulnerabilities'
    //     dependencyCheckPublisher pattern: 'dependency-check-report.xml'
    //   }
    // }

    // stage('Quality Analysis') {
    //   parallel {
    //     // run Sonar Scan and Integration tests in parallel. This syntax requires Declarative Pipeline 1.2 or higher
    //     stage ('Integration Test') {
    //       agent any  //run this stage on any available agent
    //       steps {
    //         echo 'Run integration tests here...'
    //       }
    //     }
    //     stage('Sonar Scan') {
    //       agent {
    //         docker {
    //           // we can use the same image and workspace as we did previously
    //           reuseNode true
    //           image 'maven:3.5.0-jdk-8'
    //         }
    //       }
    //       environment {
    //         //use 'sonar' credentials scoped only to this stage
    //         SONAR = credentials('sonar')
    //       }
    //       steps {
    //         sh 'mvn sonar:sonar -Dsonar.login=$SONAR_PSW'
    //       }
    //     }
    //   }
    // }

    stage('Build and Publish Image') {
      when {
        branch 'master'  //only run these steps on the master branch
      }
      steps {
        // /*
        //  * Multiline strings can be used for larger scripts. It is also possible to put scripts in your shared library
        //  * and load them with 'libaryResource'
        //  */
        // sh """
        //   docker build -t ${IMAGE} .
        //   docker tag ${IMAGE} ${IMAGE}:${VERSION}
        //   docker push ${IMAGE}:${VERSION}
        // """
        echo 'Building and publishing image...'
      }
    }
  }

  post {
    failure {
      // notify users when the Pipeline fails
      echo 'The pipeline failed!'
    }
  }
}
