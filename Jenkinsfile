node('node') {


    currentBuild.result = "SUCCESS"

    try {

       stage('Checkout'){

          echo 'checkout...'
          checkout scm
       }

       stage('Test'){

         echo 'test...'
         env.NODE_ENV = "test"

         print "Environment will be : ${env.NODE_ENV}"

         sh 'node -v'
         sh 'npm i'
         sh 'npm run format:dry'
         sh 'npm run types'
         sh 'npm run test:ci'

       }

       stage('Cleanup'){

         echo 'cleanup...'
         sh 'rm node_modules -rf'

         mail body: 'project build successful',
                     from: 'xxxx@yyyyy.com',
                     replyTo: 'xxxx@yyyy.com',
                     subject: 'project build successful',
                     to: 'yyyyy@yyyy.com'
       }



    }
    catch (err) {

        currentBuild.result = "FAILURE"

        throw err
    }

}