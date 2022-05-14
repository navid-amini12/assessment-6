



const express = require('express')
const cors = require("cors")
const path = require('path')
const app = express()
app.use(express.static('public'));
app.use(cors())
const {bots, playerRecord} = require('./data')
const {shuffleArray} = require('./utils')

app.use(express.json())
app.use(express.static('public'));

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "../index.html"))
})




// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '0fec13e3cb3f4037b8e549bfe670c0b7',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello World')





app.get('/api/robots', (req, res) => {
    try {
        res.status(200).send(botsArr)
       rollbar.log("Robots sent successfully")
    } catch (error) {
        console.log('ERROR GETTING BOTS', error)
        rollbar.error("failed to send Robots")
        res.sendStatus(400)
    }
})

app.get('/api/robots/five', (req, res) => {
    try {
        let shuffled = shuffleArray(bots)
        let choices = shuffled.slice(0, 5)
        let compDuo = shuffled.slice(6, 8)
        res.status(200).send({choices, compDuo})
    } catch (error) {
        console.log('ERROR GETTING FIVE BOTS', error)
        res.sendStatus(400)
    }
})

app.post('/api/duel', (req, res) => {
    try {
        // getting the duos from the front end
        let {compDuo, playerDuo} = req.body

        // adding up the computer player's total health and attack damage
        let compHealth = compDuo[0].health + compDuo[1].health
        let compAttack = compDuo[0].attacks[0].damage + compDuo[0].attacks[1].damage + compDuo[1].attacks[0].damage + compDuo[1].attacks[1].damage
        
        // adding up the player's total health and attack damage
        let playerHealth = playerDuo[0].health + playerDuo[1].health
        let playerAttack = playerDuo[0].attacks[0].damage + playerDuo[0].attacks[1].damage + playerDuo[1].attacks[0].damage + playerDuo[1].attacks[1].damage
        
        // calculating how much health is left after the attacks on each other
        let compHealthAfterAttack = compHealth - playerAttack
        let playerHealthAfterAttack = playerHealth - compAttack

        // comparing the total health to determine a winner
        if (compHealthAfterAttack > playerHealthAfterAttack) {
            playerRecord.losses++
            res.status(200).send('You lost!')
            rollbar.log("game successfully completed")
        } else {
            playerRecord.losses++
            res.status(200).send('You won!')
            rollbar.log("game successfully completed")
        }
    } catch (error) {
        console.log('ERROR DUELING', error)
        rollbar.error("error occured")
        res.sendStatus(400)
    }
})

app.get('/api/player', (req, res) => {
    try {
        res.status(200).send(playerRecord)
    } catch (error) {
        rollbar.configure({uncaughtErrorLevel: 'warning'});
        res.sendStatus(400)
    }
})

const port = process.env.PORT || 3000

app.listen(port, () => {

  console.log(`Listening on port ${port}`)
})