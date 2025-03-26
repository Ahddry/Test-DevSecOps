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
    stage('SAST - Semgrep-OSS') {
      steps {
      script {
        sh '''
          semgrep --version
          echo ".*" > ".semgrepignore"
          ls -al
          semgrep-custom . .
          ls -al
        '''
        archiveArtifacts artifacts: 'semgrep-report.json', allowEmptyArchive: true
        archiveArtifacts artifacts: 'semgrep-results-summary.txt', allowEmptyArchive: true
      }
      }
    }

    stage('SBOM - CycloneDX & SCA - Depscan') {
      steps {
      script {
        sh '''
        cdxgen -v
        depscan --version
        cdxgen -o cdxgen-sbom.json
        depscan --no-vuln-table --no-banner --bom cdxgen-sbom.json --reports-dir .
        '''
        archiveArtifacts artifacts: 'cdxgen-sbom.json', allowEmptyArchive: true
        archiveArtifacts artifacts: 'depscan-bom.json', allowEmptyArchive: true
      }
      }
    }

    stage('Parse and upload SAST results') {
      steps {
      script {
        withCredentials([
        string(credentialsId: 'PARSER_GITHUB_OWNER', variable: 'PARSER_GITHUB_OWNER'),
        string(credentialsId: 'PARSER_GITHUB_REPO', variable: 'PARSER_GITHUB_REPO'),
        string(credentialsId: 'PROJECT_ID', variable: 'PROJECT_ID'),
        string(credentialsId: 'MONGODB_URL', variable: 'MONGODB_URL'),
        string(credentialsId: 'MONGODB_USERNAME', variable: 'MONGODB_USERNAME'),
        string(credentialsId: 'MONGODB_PASSWORD', variable: 'MONGODB_PASSWORD')
        ]) {
          // wget https://github.com/${PARSER_GITHUB_OWNER}/${PARSER_GITHUB_REPO}/releases/latest/download/parsers.zip -O parsers.zip
        sh '''
          wget https://github.com/Ahddry/sast-visu-tools/releases/download/0.5.0/parsers.zip -O parsers.zip
          unzip -n parsers.zip
          python sast-parser.py semgrep-report.json
        '''
        archiveArtifacts artifacts: 'parsed_file.json', allowEmptyArchive: true
        }
      }
      }
    }

    stage('Parse and upload SBOM results') {
      steps {
      script {
        withCredentials([
        string(credentialsId: 'PARSER_GITHUB_OWNER', variable: 'PARSER_GITHUB_OWNER'),
        string(credentialsId: 'PARSER_GITHUB_REPO', variable: 'PARSER_GITHUB_REPO'),
        string(credentialsId: 'PROJECT_ID', variable: 'PROJECT_ID'),
        string(credentialsId: 'MONGODB_URL', variable: 'MONGODB_URL'),
        string(credentialsId: 'MONGODB_USERNAME', variable: 'MONGODB_USERNAME'),
        string(credentialsId: 'MONGODB_PASSWORD', variable: 'MONGODB_PASSWORD')
        ]) {
          // wget https://github.com/${PARSER_GITHUB_OWNER}/${PARSER_GITHUB_REPO}/releases/latest/download/parsers.zip -O parsers.zip
        sh '''
          python sbom-parser.py cdxgen-sbom.json depscan-bom.json
        '''
        }
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