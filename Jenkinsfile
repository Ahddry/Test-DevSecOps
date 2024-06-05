pipeline {
  agent {
    node {
      label 'docker-agent'
    }
  }

  environment {
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

    stage('Block pipeline if there are critical vulnerabilities') {
      steps {
        script {
          def semgrepReport = readFile 'semgrep.json'
          if (semgrepReport.contains('severity": "error')) {
            error 'There are critical vulnerabilities in the code of the project'
          }
          def odcReport = readFile 'dependency-check-report.json'
          if (odcReport.contains('Severity: critical')) {
            error 'There are critical vulnerabilities in the dependencies of the project'
          }
        }
      }
    }

    stage('Publish reports to external storage')
    {
      steps {
        script {
          def semgrepReport = readFile 'semgrep.json'
          def odcReport = readFile 'dependency-check-report.json'
          // publish reports to external storage
          echo 'Publishing reports to external storage..'
        }
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
