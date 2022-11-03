import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { getBoard, getSurvivorsToChoose } from './database/data.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

// const game = {
//   players: [
//     { 
//       socketId: socket.id, 
//       name: name, 
//       survivors: [
//         {
//           position: {
//             x: 3,
//             y: 1
//           },
//           name: 'Josh',
//           life: 3,
//           isChild: false,
//           inventory: [],
//           level: 0,
//           abilities: [
//             {
//               name: 'LISO',
//               description: ABILITIES.LISO,
//               level: 'BLUE'
//             },
//           ]
//         },
//       ] 
//     }
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
}

io.on("connection", (socket) => {
  console.log(`${socket.id} conectado`)

  socket.on('AddPlayer', (name) => {
    game.players.push({ socketId: socket.id, name, survivors: [] })

    io.emit('PlayersConnected', game.players)
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
    game.players.forEach((player, playerIndex) => {
      const isFirstPlayer = playerIndex === 0
      const survColorIndex = isFirstPlayer ? 0 : game.players[playerIndex - 1].survivors.length
      player.survivors = player.survivors.map((survivor, survIndex) =>
      ({
        ...survivor,
        position: game.board.initialSurvivorsPosition,
        color: survColors[survColorIndex + survIndex]
      }))
    })

    socket.emit('SendBoard', game.board, game.players)
  })


  socket.on('SelectCurrentSurvivor', survivorName => {
    game.currentSurvivor = getCurrentCurrentSurvivor(survivorName)

    io.emit('CurrentSurvivorSelected', { ...game.currentSurvivor, actions: 3 })
  })

  socket.on('MoveSurvivor', (surv, isFreeMove) => {
    const currentPlayer = game.players[getCurrentPlayerIndex(socket)]
    const survivorIndex = currentPlayer.survivors.findIndex(survivor => survivor.name === surv.name)
    const newSurv = { ...surv, actions: surv.actions - (isFreeMove ? 0 : 1) }

    if (newSurv.actions < 0) return

    game.currentSurvivor = newSurv
    currentPlayer.survivors[survivorIndex] = surv

    if (newSurv.actions === 0) {
      io.emit('NextSurvivor')
    }

    updateGame()
  })

  socket.on('StartZombieRound', () => {
    if (game.board.zombies.length > 0) {
      let previousTimeout = 0
      let timeout = 0
      game.board.zombies.forEach((zombie, index) => {
        const shortestPath = findShortestPath(graph(), `${zombie.position.x}${zombie.position.y}`, '31')
        timeout += previousTimeout
        previousTimeout = 1000 * (shortestPath.path.length + 1)
        console.log(timeout);
        setTimeout(() => {
          console.log('fora', timeout)
          game.board.currentZombieIndex = index
          updateGame()
          shortestPath.path.map((pathPosition, pathIndex) => {
            setTimeout(() => {
              console.log('dentro', 1000 * (pathIndex + 1))
              game.board.zombies[index] = {
                ...zombie,
                position: {
                  ...zombie.position,
                  x: parseInt(pathPosition.charAt(0)),
                  y: parseInt(pathPosition.charAt(1)),
                }
              }
              updateGame()
            }, 1000 * (pathIndex + 1));
          })
        }, timeout);
      })

      // game.board.currentZombieIndex = -1
      // updateGame()
    }

  })


  socket.on('disconnect', () => {
    const playerIndex = game.players.findIndex(player => player.socketId === socket.id)
    game.players.splice(playerIndex)
    updatePlayers()
  })
})

function positionWhereZombiesWillGo() {
  const currentZombiePosition = game.board.zombies[game.board.currentZombieIndex].position
  const positionAsArray = [currentZombiePosition.x, currentZombiePosition.y]

  const closestSurvivor = {}


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
// {
//   "11": {
//       "12": 1,
//       "21": 1
//   },
//   "12": {
//       "11": 1
//   },
//   "13": {
//       "14": 1,
//       "23": 1
//   },
//   "14": {
//       "13": 1,
//       "15": 1,
//       "24": 1
//   },
//   "15": {
//       "14": 1
//   },
//   "21": {
//       "22": 1
//   },
//   "22": {
//       "21": 1,
//       "32": 1
//   },
//   "23": {
//       "13": 1,
//       "33": 1
//   },
//   "24": {
//       "14": 1,
//       "25": 1,
//       "34": 1
//   },
//   "25": {
//       "24": 1,
//       "35": 1
//   },
//   "31": {
//       "32": 1
//   },
//   "32": {
//       "22": 1,
//       "31": 1,
//       "33": 1
//   },
//   "33": {
//       "23": 1,
//       "32": 1,
//       "34": 1
//   },
//   "34": {
//       "24": 1,
//       "33": 1,
//       "35": 1
//   },
//   "35": {
//       "25": 1,
//       "34": 1
//   },
// }
// })

function updatePlayers() {
  io.emit('UpdatePlayers', game.players)
}

function updateGame() {
  io.emit('UpdateGame', game)
}

function getCurrentPlayerIndex(socket) {
  return game.players.findIndex(player => player.socketId === socket.id)
}

function getCurrentCurrentSurvivor(survName) {
  return getAllSurvivors().find(surv => surv.name === survName)
}

function getAllSurvivors() {
  return game.players.reduce((acc, cur) => [...acc, ...cur.survivors], [])
}

// function refreshPlayers() {
//   io.emit('PlayersRefresh', game.players)
// }

// app.get('/', (req, res) => res.send("Hiiiii"))

server.listen(process.env.PORT || 4000)