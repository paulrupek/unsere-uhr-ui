const express = require('express'),
      yargs = require('yargs')

// initialize express
const app = express()

// command line arguments
const argv = yargs
    .option('port', {
        alias: 'p',
        describe: 'Der Port für den http-Server',
        default: 8080,
        type: 'number'
    })
    .option('serve', {
        alias: 's',
        describe: 'Gibt an auf welche Art ausgeliefert wird',
        default: 'src',
        choices: ['src', 'build', 'dist']
    })
    .help()
    .example('$0 -p 1337')
    .completion()
    .epilogue('Mehr informationen gibt es auf https://github.com/pawelrupek/unsere-uhr-ui')
    .argv

// route / to index.html
app.get('/', (req, res) => res.redirect('index.html'))

// middleware
app.use(express.static('./' + argv.serve))
app.use('/node_modules/', express.static('./node_modules'))

// start server
app.listen(argv.port, () => console.log(`\r\n The server is running on localhost:${argv.port}`))
