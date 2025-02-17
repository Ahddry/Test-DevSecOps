pipeline {
  agent {
    node {
      label 'docker-agent'
    }
  }


  stages {
    stage('Build') {
        steps {
            echo 'Building..'
            sh 'pip --version'
            sh 'semgrep --version'
            sh '/home/jenkins/dependency-check/bin/dependency-check.sh --version'
            sh 'ls -l /usr/local/bin/'
            echo 'Build completed.'
        }
    }

    stage('Semgrep-Scan') {
        steps {
          sh 'semgrep-custom . .'
          archiveArtifacts artifacts: 'semgrep-report.json'
          archiveArtifacts artifacts: 'semgrep-results-summary.txt'
      }
    }

    stage('SCA OWASP Dependency-Check') {
      steps {
        sh '/home/jenkins/dependency-check/bin/dependency-check.sh -n --scan . --format "ALL" --out .'
        archiveArtifacts artifacts: 'dependency-check-report.html'
        dependencyCheckPublisher pattern: 'dependency-check-report.xml'
      }
    }

    stage('Block pipeline if there are critical vulnerabilities') {
      steps {
        script {
          def semgrepReport = readFile 'semgrep-report.json'
          if (semgrepReport.contains('severity": "error')) {
            echo 'There are critical vulnerabilities in the code of the project! Blocking the pipeline..'
            error 'There are critical vulnerabilities in the code of the project'
          }
          def odcReport = readFile 'dependency-check-report.html'
          if (odcReport.contains('Severity: critical')) {
            echo 'There are critical vulnerabilities in the dependencies of the project! Blocking the pipeline..'
            error 'There are critical vulnerabilities in the dependencies of the project'
          }
        }
      }
    }

    // stage('Publish reports to external storage')
    // {
    //   steps {
    //     script {
    //       def semgrepReport = readFile 'semgrep.json'
    //       def odcReport = readFile 'dependency-check-report.json'
    //       // publish reports to external storage
    //       echo 'Publishing reports to external storage..'
    //       def awsS3 = [:]
    //       awsS3['files'] = 'dependency-check-report.xml' // Remplace avec le nom de ton fichier de rapport
    //       awsS3['bucket'] = 'test-devsecops-op-jenkins '
    //       awsS3['path'] = '${env.BUILD_ID}' // Optionnel : spécifie un chemin dans le bucket
    //       awsS3Upload(awsS3)
    //     }
    //   }
    // }
  }

  post {
    failure {
      // notify users when the Pipeline fails
      echo 'The pipeline failed!'
    }
  }
}
