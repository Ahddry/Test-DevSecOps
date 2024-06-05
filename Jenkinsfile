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
          // sh 'semgrep ci --text --json-output=semgrep.json'
          sh 'semgrep scan --config auto --text --json-output=semgrep.json'
          sh 'cat semgrep.json'
          archiveArtifacts artifacts: 'semgrep.json'
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

    stage('SCA OWASP Dependency-Check') {
      steps {
        sh 'ls /home/jenkins/ -l' // list the contents of the workspace
        sh 'ls /home/jenkins/dependency-check/bin/ -l' // list the contents of the workspace
        sh '/home/jenkins/dependency-check/bin/dependency-check.sh --scan . --format "ALL" --project "my-project" --out .'
        archiveArtifacts artifacts: 'dependency-check-report.html'
        dependencyCheckPublisher pattern: 'dependency-check-report.xml'
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
