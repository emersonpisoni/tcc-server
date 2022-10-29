import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { getSurvivorsToChoose } from './database/survivors.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const game = {
  players: [
    {
      socketId: 'socketId',
      name: 'name',
      survivors: []
    }
  ],
  survivors: {}
}

io.on("connection", (socket) => {
  console.log(`${socket.id} conectado`)

  socket.on('AddPlayer', (name) => {
    game.players.push({ socketId: socket.id, name, survivors: [] })

    io.emit('PlayersConnected', game.players)
    console.log(game.players)
  })

  socket.on('GetAvailableSurvivors', () => {
    socket.emit('SendAvailableSurvivors', getSurvivorsToChoose(), game.players)
  })

  socket.on('AddSurvivorToPlayer', newSurvivor => {
    const playerIndex = game.players.findIndex(player => player.socketId === socket.id)
    const player = game.players[playerIndex]
    const currentSurvivorIndex = player.survivors.findIndex(currentSurvivor => currentSurvivor.name === newSurvivor.name)
    const hasAlreadySurvivor = currentSurvivorIndex !== -1

    if (hasAlreadySurvivor) {
      game.players[playerIndex].survivors.splice(currentSurvivorIndex, 1)
    } else {
      game.players[playerIndex].survivors.push(newSurvivor)
    }

    io.emit('UpdateAddSurvivorsToPlay', game.players)
  })

  socket.on('disconnect', () => {
    const playerIndex = game.players.findIndex(player => player.socketId === socket.id)
    game.players.splice(playerIndex)
    refreshPlayers()
  })




  socket.on('AddSurvivors', (survivors) => {
    game.survivors = {
      [survivors[0].name]: survivors[0],
      [survivors[1].name]: survivors[1],
      [survivors[2].name]: survivors[2],
      [survivors[3].name]: survivors[3],
      [survivors[4].name]: survivors[4],
      [survivors[5].name]: survivors[5],
    }

    console.log('on add suvvivors', game.survivors)
  })

  socket.on('MoveSurvivor', (newSurvivor) => {
    game.survivors[newSurvivor.name] = newSurvivor
    console.log('on move suvvivors', newSurvivor)

    io.emit('RefreshSurvivors', newSurvivor, socket.id)
  })

  socket.on('SetCurrentSurvivor', (survivorName) => {
    io.emit('SetCurrentSurvivor', survivorName)
  })
})

function refreshPlayers() {
  io.emit('PlayersRefresh', game.players)
}

app.get('/', (req, res) => res.send("Hiiiii"))

server.listen(process.env.PORT || 4000)