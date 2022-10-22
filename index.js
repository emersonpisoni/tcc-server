import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const game = {
  players: [],
  survivors: {}
}

io.on("connection", (socket) => {
  console.log(`${socket.id} conectado`)

  const name = 'Player_' + socket.id.substring(0, 5)
  game.players.push({ [socket.id]: name })

  io.emit('PlayerConnected', game.players)

  socket.on('disconnect', () => {
    const playerIndex = Object.keys(game.players).findIndex(id => id === socket.id)
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