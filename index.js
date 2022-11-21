import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { getBoard, getSurvivorsToChoose, itemCards, ZOMBIES } from './database/data.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

// const game = {
//   players: [
// { 
//   socketId: socket.id, 
//   name: name, 
//   survivors: [
//     {
//       position: {
//         x: 3,
//         y: 1
//       },
//       name: 'Josh',
//       life: 3,
//       isChild: false,
//       inventory: [],
//       level: 0,
//       abilities: [
//         {
//           name: 'LISO',
//           description: ABILITIES.LISO,
//           level: 'BLUE'
//         },
//       ]
//     },
//   ] 
// }
//   ],
//   board: {
//     currentZombieIndex: 0,
//     initialSurvivorsPosition: {
//       x: 3,
//       y: 1
//     },
//     zombies: [
//       {
//         name: 'LERDO',
//         damage: 1,
//         life: 1,
//         adrenalinePointsGiven: 1,
//         actions: 2,
//         position: {
//           x: 1,
//           y: 3
//         },
//       },
//     ],
//     positions: [
//       {
//         mapPosition: {
//           x: 1,
//           y: 1
//         },
//         type: MAP_POSITION_TYPE.ROOM,
//         canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.DOWN],
//         walls: [DIRECTIONS.UP, DIRECTIONS.LEFT],
//         freeMoveTo: [],
//         hasGoal: false,
//         hasGunBox: false,
//         evacuatePosition: false,
//         zombieSpawnByRound: false,
//         zombieSpawnInitial: 0,
//       },
//     ],
//   },
//   currentSurvivor: {
//     actions: 3
//   }
// }

const survColors = [
  'ORANGE',
  'GREEN',
  'YELLOW',
  'PURPLE',
  'RED',
  'BLUE',
]

const game = {
  players: [],
  board: {},
  currentSurvivor: {},
  cards: {
    initial: itemCards().initials,
    search: itemCards().search,
    tunnedGuns: itemCards().tunnedGuns
  }
}

io.on("connection", (socket) => {
  console.log(`${socket.id} conectado`)

  socket.on('AddPlayer', (name) => {
    game.players.push({ socketId: socket.id, name, survivors: [] })

    io.emit('PlayersConnected', game.players)
    console.log(`${game.players.map(m => m.name)} conectados`)
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

  socket.on('GoToChooseSurvivors', () => {
    io.emit('GoToChooseSurvivors')
  })

  socket.on('StartGame', () => {
    io.emit('StartGame')
  })

  socket.on('GetBoard', () => {
    game.board = getBoard()
    let survColorIndex = 0
    game.players.forEach((player) => {
      // const isFirstPlayer = playerIndex === 0
      // const survColorIndex = isFirstPlayer ? 0 : game.players[playerIndex - 1].survivors.length
      player.survivors = player.survivors.map((survivor, survIndex) => {
        const newSurv = {
          ...survivor,
          position: game.board.initialSurvivorsPosition,
          color: survColors[survColorIndex],
          inventory: [game.cards.initial[survIndex]]
        }
        survColorIndex++

        return newSurv
      })
    })

    socket.emit('SendBoard', game.board, game.players)
  })


  socket.on('SelectCurrentSurvivor', survivorName => {
    if (!survivorName) {
      game.currentSurvivor = {}
    } else {
      game.currentSurvivor = getCurrentCurrentSurvivor(survivorName)
      verifyZombiesICanHit(game.currentSurvivor.position, 0)
    }

    const selectedSurvivor = { ...game.currentSurvivor, actions: 3 }
    game.currentSurvivor = selectedSurvivor

    io.emit('CurrentSurvivorSelected', selectedSurvivor)
  })

  socket.on('MoveSurvivor', (surv, isFreeMove, gunInventoryIndex) => {
    doAction(surv, isFreeMove, gunInventoryIndex)
    updateGame('move surv')
  })

  function doAction(surv, isFreeMove, gunInventoryIndex) {
    const currentPlayer = game.players[getCurrentPlayerIndex(socket)]
    const survivorIndex = currentPlayer.survivors.findIndex(survivor => survivor.name === surv.name)
    console.log(surv.actions);
    const newSurv = { ...surv, actions: surv.actions - (isFreeMove ? 0 : 1) }
    console.log(newSurv.actions);

    if (newSurv.actions < 0) return

    game.currentSurvivor = newSurv
    currentPlayer.survivors[survivorIndex] = newSurv
    gunInventoryIndex !== undefined && verifyZombiesICanHit(game.currentSurvivor.position, gunInventoryIndex)
  }

  socket.on('StartZombieRound', () => {
    if (game.board.zombies.length > 0) {
      let previousTimeout = 0
      let timeout = 0

      // array de posições dos sobreviventes no mapa
      const survPositions = getAllSurvivors().map(surv => `${surv.position.x}${surv.position.y}`)

      game.board.zombies.forEach((zombie, index) => {
        let shortestSurvPosition
        let distance
        // salva na shortestSurvPosition o survivor mais próximo
        survPositions.forEach((survPosition, survIndex) => {
          const shortestPath = findShortestPath(graph(), `${zombie.position.x}${zombie.position.y}`, survPosition)
          if (survIndex === 0) {
            shortestSurvPosition = survPosition
            distance = shortestPath.distance
          } else if (distance !== 'Infinity') {
            if (shortestPath.distance === 'Infinity') {
              shortestSurvPosition = survPosition
              distance = shortestPath.distance
            } else if (shortestPath.distance < distance) {
              distance = shortestPath.distance
              shortestSurvPosition = survPosition
            }
          }
        })
        // cria o caminho até o survivor mais próximo
        const shortestPath = findShortestPath(graph(), `${zombie.position.x}${zombie.position.y}`, shortestSurvPosition)

        shortestPath.path = shortestPath.path.slice(0, zombie.actions + 1)

        while (shortestPath.path.length < zombie.actions + 1) {
          shortestPath.path.push('AttackAction')
        }


        const timerOfZombie = []
        const timerOfEachPosition = []
        timeout += previousTimeout
        previousTimeout = 1000 * (shortestPath.path.length + 1)
        timerOfZombie.push(setTimeout(() => {
          let lastZombiePosition
          game.board.currentZombieIndex = index
          updateGame('atualiza index zumbi')
          shortestPath.path.forEach((pathPosition, pathIndex) => {
            timerOfEachPosition.push(setTimeout(() => {
              if (pathPosition === 'AttackAction') {
                const survivorWithHigherLife =
                  getAllSurvivors()
                    .filter(surv => surv.position.x === parseInt(lastZombiePosition.charAt(0)) && surv.position.y === parseInt(lastZombiePosition.charAt(1)))
                    .reduce((acc, cur) => cur.life > acc.life ? cur : acc)
                const player = game.players[getPlayerBySurvivorName(survivorWithHigherLife.name)]
                const indexOfSurvThatWillBeHitted = player.survivors.findIndex(surv => surv.name === survivorWithHigherLife.name)
                game.players[getPlayerBySurvivorName(survivorWithHigherLife.name)].survivors[indexOfSurvThatWillBeHitted] = {
                  ...survivorWithHigherLife,
                  life: survivorWithHigherLife.life - 1
                }
                if (survivorWithHigherLife.life - 1 <= 0) {
                  timerOfZombie.forEach(timer => clearTimeout(timer))
                  timerOfEachPosition.forEach(timer => clearTimeout(timer))
                  endGame('Survivor Died')
                }
                updateGame('zombie attack')
              } else {
                lastZombiePosition = pathPosition
                game.board.zombies[index] = {
                  ...zombie,
                  // descarta primeira iteração
                  actions: pathIndex != 0 ? zombie.actions - 1 : zombie.actions,
                  position: {
                    ...zombie.position,
                    x: parseInt(pathPosition.charAt(0)),
                    y: parseInt(pathPosition.charAt(1)),
                  }
                }
                updateGame('atualiza position zumbi')
              }
              if (shortestPath.path.length === pathIndex + 1)
                // se for o último zumbi recomeça o jogo
                if (game.board.zombies.length === index + 1 && shortestPath.path.length === pathIndex + 1) {
                  finishRound()
                }
            }, 1000 * (pathIndex + 1)))
          })
        }, timeout))
      })
    } else {
      finishRound()
    }
  })

  function finishRound() {
    game.board.currentZombieIndex = -1
    addMoreZombies()
    updateGame('tira current zumbi')
    io.emit('StartSurvivorRound', game.players)
  }

  function addMoreZombies() {
    const mapPositionForZombieSpawn = game.board.positions.filter(position => position.zombieSpawnByRound)
    mapPositionForZombieSpawn.forEach(({ mapPosition }) => {
      const zombies = Object.values(ZOMBIES)
      const randomNumber = getRandomNumber(0, zombies.length - 1)
      game.board.zombies.push({ ...zombies[randomNumber], position: mapPosition })
    })
    game.board.zombies = game.board.zombies.map(zombie => ({ ...zombie, actions: 2 }))
  }

  socket.on('ShowRollDices', showDices => {
    io.emit('ShowRollDices', showDices)
  })

  socket.on('RollDices', diceValues => {
    console.log(game.currentSurvivor, 'roll dices');
    doAction(game.currentSurvivor)

    updateGame('rolldices')
    socket.broadcast.emit('RollDices', diceValues)
  })

  socket.on('KillZombie', zombie => {
    const zombieIndexToKill = game.board.zombies.findIndex(boardZombie => {
      return boardZombie.position.x === zombie.position.x
        && boardZombie.position.y === zombie.position.y
        && boardZombie.name === zombie.name
    })

    game.board.zombies.splice(zombieIndexToKill, 1)

    upSurvivorLevel(game.currentSurvivor, zombie.adrenalinePointsGiven)
  })

  function upSurvivorLevel(surv, levelGivenFromZombie) {
    const currentPlayer = game.players[getCurrentPlayerIndex(socket)]
    const survivorIndex = currentPlayer.survivors.findIndex(survivor => survivor.name === surv.name)
    const newSurv = { ...surv, level: surv.level + levelGivenFromZombie }

    game.currentSurvivor = newSurv
    currentPlayer.survivors[survivorIndex] = newSurv
    updateGame('kill zombie')
  }

  socket.on('VerifyWhoICanHit', (gunInventoryIndex) => {
    verifyZombiesICanHit(game.currentSurvivor.position, gunInventoryIndex)
  })

  function verifyZombiesICanHit(survPosition, gunInventoryIndex) {
    const gunDistance = game.currentSurvivor.inventory[gunInventoryIndex].distanceToUse[1]

    const zombies = game.board.zombies.filter(zombie => {
      const path = findShortestPath(graph(), `${survPosition.x}${survPosition.y}`, `${zombie.position.x}${zombie.position.y}`)
      return path.distance === 'Infinity' || path.distance <= gunDistance
    })

    socket.emit('VerifyWhoICanHit', zombies)
  }

  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  socket.on('SearchItem', () => {
    const randomNumber = getRandomNumber(0, game.cards.search.length - 1)
    const randomItem = game.cards.search.splice(randomNumber, 1)[0]

    const newSurv = { ...game.currentSurvivor, inventory: [...game.currentSurvivor.inventory, randomItem] }
    if (game.cards.search.length === 0) game.cards.search = itemCards().search
    if (game.cards.initial.length === 0) game.cards.search = itemCards().initial
    if (game.cards.tunnedGuns.length === 0) game.cards.search = itemCards().tunnedGuns
    doAction(newSurv)
    updateGame('search item')
  })

  socket.on('disconnect', () => {
    console.log('disconnected', socket.id)
    const playerIndex = game.players.findIndex(player => player.socketId === socket.id)
    game.players.splice(playerIndex, 1)
    updatePlayers()
  })
})

function endGame(typeOfEndGame) {
  io.emit('EndGame', typeOfEndGame)
}

function graph() {
  const graph = {}
  getBoard().positions.forEach(({ mapPosition, canMoveTo, freeMoveTo }) => {
    if (canMoveTo.includes('RIGHT') || freeMoveTo.includes('RIGHT')) {
      graph[`${mapPosition.x}${mapPosition.y}`] = { ...graph[`${mapPosition.x}${mapPosition.y}`], [`${mapPosition.x}${mapPosition.y + 1}`]: 1 }
    }
    if (canMoveTo.includes('DOWN') || freeMoveTo.includes('DOWN')) {
      graph[`${mapPosition.x}${mapPosition.y}`] = { ...graph[`${mapPosition.x}${mapPosition.y}`], [`${mapPosition.x + 1}${mapPosition.y}`]: 1 }
    }
    if (canMoveTo.includes('LEFT') || freeMoveTo.includes('LEFT')) {
      graph[`${mapPosition.x}${mapPosition.y}`] = { ...graph[`${mapPosition.x}${mapPosition.y}`], [`${mapPosition.x}${mapPosition.y - 1}`]: 1 }
    }
    if (canMoveTo.includes('UP') || freeMoveTo.includes('UP')) {
      graph[`${mapPosition.x}${mapPosition.y}`] = { ...graph[`${mapPosition.x}${mapPosition.y}`], [`${mapPosition.x - 1}${mapPosition.y}`]: 1 }
    }
  })
  return graph
}

let shortestDistanceNode = (distances, visited) => {
  // create a default value for shortest
  let shortest = null;

  // for each node in the distances object
  for (let node in distances) {
    // if no node has been assigned to shortest yet
    // or if the current node's distance is smaller than the current shortest
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];

    // and if the current node is in the unvisited set
    if (currentIsShortest && !visited.includes(node)) {
      // update shortest to be the current node
      shortest = node;
    }
  }
  return shortest;
};

let findShortestPath = (graph, startNode, endNode) => {
  // track distances from the start node using a hash object
  let distances = {};
  distances[endNode] = "Infinity";
  distances = Object.assign(distances, graph[startNode]);
  // track paths using a hash object
  let parents = { endNode: null };
  for (let child in graph[startNode]) {
    parents[child] = startNode;
  }

  // collect visited nodes
  let visited = [];
  // find the nearest node
  let node = shortestDistanceNode(distances, visited);

  // for that node:
  while (node) {
    // find its distance from the start node & its child nodes
    let distance = distances[node];
    let children = graph[node];

    // for each of those child nodes:
    for (let child in children) {

      // make sure each child node is not the start node
      if (String(child) === String(startNode)) {
        continue;
      } else {
        // save the distance from the start node to the child node
        let newdistance = distance + children[child];
        // if there's no recorded distance from the start node to the child node in the distances object
        // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
        if (!distances[child] || distances[child] > newdistance) {
          // save the distance to the object
          distances[child] = newdistance;
          // record the path
          parents[child] = node;
        }
      }
    }
    // move the current node to the visited set
    visited.push(node);
    // move to the nearest neighbor node
    node = shortestDistanceNode(distances, visited);
  }

  // using the stored paths from start node to end node
  // record the shortest path
  let shortestPath = [endNode];
  let parent = parents[endNode];
  while (parent) {
    shortestPath.push(parent);
    parent = parents[parent];
  }
  shortestPath.reverse();

  //this is the shortest path
  let results = {
    distance: distances[endNode],
    path: shortestPath,
  };
  // return the shortest path & the end node's distance from the start node
  return results;
};

function updatePlayers() {
  io.emit('UpdatePlayers', game.players)
}

function updateGame(caller) {
  io.emit('UpdateGame', game, caller)
}

function getCurrentPlayerIndex(socket) {
  return game.players.findIndex(player => player.socketId === socket.id)
}

function getCurrentCurrentSurvivor(survName) {
  return getAllSurvivors().find(surv => surv.name === survName)
}

function getPlayerBySurvivorName(survName) {
  return game.players.findIndex(player => player.survivors.some(surv => surv.name === survName))
}

function getAllSurvivors() {
  return game.players.reduce((acc, cur) => [...acc, ...cur.survivors], [])
}

server.listen(process.env.PORT || 4000)