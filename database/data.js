const ABILITIES = {
  LISO: 'O Sobrevivente ignora zumbis enquanto realiza ações de movimento, e não gasta ações extras ao se mover para fora de uma zona que contém zumbis',
  PLUS1_AÇÃO: 'O Sobrevivente pode realizar + 1 ação',
  PLUS1_DICE_MELEE: 'O Sobrevivente pode jogar um dado a mais para ações corpo a corpo',
  PLUS1_COMBAT_ACTION: 'O Sobrevivente pode realizar + 1 ação de combate',
  PLUS1_MOVE: 'O Sobrevivente pode se mover + 1 vez',
  PLUS1_DICE_VALUE_COMBAT_ACTION: 'Após jogar os dados o valor total recebe + 1',
  SORTE: 'Após jogar os dados o valor total recebe + 1',
}

export const ZOMBIES = {
  LERDO: {
    name: 'LERDO',
    damage: 1,
    life: 1,
    adrenalinePointsGiven: 1,
    actions: 2
  },
  BALOFO: {
    name: 'BALOFO',
    damage: 1,
    life: 2,
    adrenalinePointsGiven: 1,
    actions: 2
  },
  CORREDOR: {
    name: 'CORREDOR',
    damage: 1,
    life: 1,
    adrenalinePointsGiven: 1,
    actions: 2
  },
}

export const MAP_POSITION_TYPE = {
  ROOM: 'ROOM',
  STREET: 'STREET',
}

export const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
}

export const MAP_POSITION_SIZE = 200

export function getSurvivorsToChoose() {
  return [
    {
      name: 'Josh',
      life: 3,
      isChild: false,
      inventory: [],
      level: 0,
      abilities: [
        {
          name: 'LISO',
          description: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: '+1 AÇÃO',
          description: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: '+1 DADO: CORPO A CORPO',
          description: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE COMBATE GRATUITA',
          description: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: '+1 NO RESULTADO: COMBATE',
          description: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
      ]
    },
    {
      name: 'Josh1',
      life: 3,
      isChild: false,
      inventory: [],
      level: 0,
      abilities: [
        {
          name: 'LISO',
          description: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: '+1 AÇÃO',
          description: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: '+1 DADO: CORPO A CORPO',
          description: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE COMBATE GRATUITA',
          description: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE MOVIMENTO GRATUITA',
          description: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: '+1 NO RESULTADO: COMBATE',
          description: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: 'SORTE',
          description: ABILITIES.SORTE,
          level: 'RED'
        },
      ]
    },
    {
      name: 'Josh2',
      life: 3,
      isChild: false,
      inventory: [],
      level: 0,
      abilities: [
        {
          name: 'LISO',
          description: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: '+1 AÇÃO',
          description: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: '+1 DADO: CORPO A CORPO',
          description: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE COMBATE GRATUITA',
          description: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE MOVIMENTO GRATUITA',
          description: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: '+1 NO RESULTADO: COMBATE',
          description: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: 'SORTE',
          description: ABILITIES.SORTE,
          level: 'RED'
        },
      ]
    },
    {
      name: 'Josh3',
      life: 3,
      isChild: false,
      inventory: [],
      level: 0,
      abilities: [
        {
          name: 'LISO',
          description: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: '+1 AÇÃO',
          description: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: '+1 DADO: CORPO A CORPO',
          description: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE COMBATE GRATUITA',
          description: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE MOVIMENTO GRATUITA',
          description: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: '+1 NO RESULTADO: COMBATE',
          description: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: 'SORTE',
          description: ABILITIES.SORTE,
          level: 'RED'
        },
      ]
    },
    {
      name: 'Josh4',
      life: 3,
      isChild: false,
      inventory: [],
      level: 0,
      abilities: [
        {
          name: 'LISO',
          description: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: '+1 AÇÃO',
          description: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: '+1 DADO: CORPO A CORPO',
          description: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE COMBATE GRATUITA',
          description: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE MOVIMENTO GRATUITA',
          description: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: '+1 NO RESULTADO: COMBATE',
          description: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: 'SORTE',
          description: ABILITIES.SORTE,
          level: 'RED'
        },
      ]
    },
    {
      name: 'Josh5',
      life: 3,
      isChild: false,
      inventory: [],
      level: 0,
      abilities: [
        {
          name: 'LISO',
          description: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: '+1 AÇÃO',
          description: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: '+1 DADO: CORPO A CORPO',
          description: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE COMBATE GRATUITA',
          description: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE MOVIMENTO GRATUITA',
          description: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: '+1 NO RESULTADO: COMBATE',
          description: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: 'SORTE',
          description: ABILITIES.SORTE,
          level: 'RED'
        },
      ]
    },
    {
      name: 'Josh6',
      life: 3,
      isChild: false,
      inventory: [],
      level: 0,
      abilities: [
        {
          name: 'LISO',
          description: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: '+1 AÇÃO',
          description: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: '+1 DADO: CORPO A CORPO',
          description: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE COMBATE GRATUITA',
          description: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE MOVIMENTO GRATUITA',
          description: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: '+1 NO RESULTADO: COMBATE',
          description: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: 'SORTE',
          description: ABILITIES.SORTE,
          level: 'RED'
        },
      ]
    },
    {
      name: 'Josh7',
      life: 3,
      isChild: false,
      inventory: [],
      level: 0,
      abilities: [
        {
          name: 'LISO',
          description: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: '+1 AÇÃO',
          description: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: '+1 DADO: CORPO A CORPO',
          description: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE COMBATE GRATUITA',
          description: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: '+1 AÇÃO DE MOVIMENTO GRATUITA',
          description: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: '+1 NO RESULTADO: COMBATE',
          description: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: 'SORTE',
          description: ABILITIES.SORTE,
          level: 'RED'
        },
      ]
    },
  ]
}

export function itemCards() {
  return {
    initials: [
      {
        name: 'PISTOLA',
        canBeDouble: true,
        distanceToUse: [0, 1],
        diceQuantity: 1,
        diceValueToHit: 3,
        damage: 1,
        makeNoiseOnDoors: false,
        makeNoiseOnZombies: true,
        munitionType: 'LEVE',
        canBrokeDoors: false,
      },
      {
        name: 'PISTOLA',
        canBeDouble: true,
        distanceToUse: [0, 1],
        diceQuantity: 1,
        diceValueToHit: 3,
        damage: 1,
        makeNoiseOnDoors: false,
        makeNoiseOnZombies: true,
        munitionType: 'LEVE',
        canBrokeDoors: false,
      },
      {
        name: 'MACHADO',
        canBeDouble: false,
        distanceToUse: [0, 0],
        diceQuantity: 1,
        diceValueToHit: 4,
        damage: 2,
        makeNoiseOnDoors: true,
        makeNoiseOnZombies: false,
        munitionType: null,
        canBrokeDoors: false,
      },
      {
        name: 'TACO DE BASEBALL',
        canBeDouble: false,
        distanceToUse: [0, 0],
        diceQuantity: 2,
        diceValueToHit: 3,
        damage: 1,
        makeNoiseOnDoors: false,
        makeNoiseOnZombies: false,
        munitionType: null,
        canBrokeDoors: false,
      },
      {
        name: 'TACO DE BASEBALL',
        canBeDouble: false,
        distanceToUse: [0, 0],
        diceQuantity: 2,
        diceValueToHit: 3,
        damage: 1,
        makeNoiseOnDoors: false,
        makeNoiseOnZombies: false,
        munitionType: null,
        canBrokeDoors: false,
      },
      {
        name: 'PÉ DE CABRA',
        canBeDouble: false,
        distanceToUse: [0, 0],
        diceQuantity: 1,
        diceValueToHit: 4,
        damage: 1,
        makeNoiseOnDoors: false,
        makeNoiseOnZombies: false,
        munitionType: null,
        canBrokeDoors: true,
      },
    ],
    search: [
      {
        name: 'KATANA',
        canBeDouble: true,
        distanceToUse: [0, 0],
        diceQuantity: 2,
        diceValueToHit: 4,
        damage: 1,
        makeNoiseOnDoors: false,
        makeNoiseOnZombies: false,
        munitionType: null,
        canBrokeDoors: false,
      },
      {
        name: 'CANO SERRADO',
        canBeDouble: true,
        distanceToUse: [0, 1],
        diceQuantity: 2,
        diceValueToHit: 3,
        damage: 1,
        makeNoiseOnDoors: false,
        makeNoiseOnZombies: true,
        munitionType: 'PESADA',
        canBrokeDoors: false,
      },
      {
        name: 'SUBMETRALHADORA',
        canBeDouble: true,
        distanceToUse: [0, 1],
        diceQuantity: 3,
        diceValueToHit: 5,
        damage: 1,
        makeNoiseOnDoors: false,
        makeNoiseOnZombies: true,
        munitionType: 'LEVE',
        canBrokeDoors: false,
      },
    ],
    tunnedGuns: [
      {
        name: 'ZANTETSUKEN',
        canBeDouble: false,
        distanceToUse: [0, 0],
        diceQuantity: 5,
        diceValueToHit: 4,
        damage: 1,
        makeNoiseOnDoors: false,
        makeNoiseOnZombies: false,
        munitionType: null,
        canBrokeDoors: false,
      },
      {
        name: 'TACO COM PREGOS',
        canBeDouble: false,
        distanceToUse: [0, 0],
        diceQuantity: 2,
        diceValueToHit: 3,
        damage: 2,
        makeNoiseOnDoors: false,
        makeNoiseOnZombies: false,
        munitionType: null,
        canBrokeDoors: false,
      },
      {
        name: 'BAIONETA',
        canBeDouble: false,
        distanceToUse: [0, 0],
        diceQuantity: 1,
        diceValueToHit: 3,
        damage: 2,
        makeNoiseOnDoors: false,
        makeNoiseOnZombies: false,
        munitionType: null,
        canBrokeDoors: false,
      },
    ]
  }
}

export function getBoard() {
  return {
    initialSurvivorsPosition: {
      x: 3,
      y: 1
    },
    zombies: [
      {
        ...ZOMBIES.CORREDOR,
        position: {
          x: 1,
          y: 3
        },
      },
      // {
      //   ...ZOMBIES.BALOFO,
      //   position: {
      //     x: 1,
      //     y: 3
      //   },
      // },
      // {
      //   ...ZOMBIES.LERDO,
      //   position: {
      //     x: 2,
      //     y: 3
      //   },
      // },
      // {
      //   ...ZOMBIES.LERDO,
      //   position: {
      //     x: 3,
      //     y: 3
      //   },
      // },
    ],
    positions: [
      {
        mapPosition: {
          x: 1,
          y: 1
        },
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.DOWN],
        // walls: [DIRECTIONS.UP, DIRECTIONS.LEFT],
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: {
          x: 1,
          y: 2
        },
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.LEFT],
        // walls: [DIRECTIONS.RIGHT],
        freeMoveTo: [DIRECTIONS.DOWN],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: {
          x: 1,
          y: 3
        },
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.DOWN],
        // walls: [DIRECTIONS.LEFT],
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: true,
        zombieSpawnInitial: 2,
      },
      {
        mapPosition: {
          x: 1,
          y: 4
        },
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.LEFT, DIRECTIONS.DOWN],
        // walls: [],
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: {
          x: 1,
          y: 5
        },
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.LEFT],
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: true,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: {
          x: 2,
          y: 1
        },
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.UP],
        freeMoveTo: [],
        hasGoal: true,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: {
          x: 2,
          y: 2
        },
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.LEFT, DIRECTIONS.DOWN],
        freeMoveTo: [DIRECTIONS.UP],
        hasGoal: false,
        hasGunBox: true,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: {
          x: 2,
          y: 3
        },
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.UP, DIRECTIONS.DOWN],
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 1,
      },
      {
        mapPosition: {
          x: 2,
          y: 4
        },
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.DOWN, DIRECTIONS.UP],
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: {
          x: 2,
          y: 5
        },
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.LEFT, DIRECTIONS.DOWN],
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: {
          x: 3,
          y: 1
        },
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.RIGHT],
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: true,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: {
          x: 3,
          y: 2
        },
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.UP, DIRECTIONS.LEFT],
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: {
          x: 3,
          y: 3
        },
        type: MAP_POSITION_TYPE.STREET,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.UP, DIRECTIONS.LEFT],
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 1,
      },
      {
        mapPosition: {
          x: 3,
          y: 4
        },
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.RIGHT, DIRECTIONS.UP, DIRECTIONS.LEFT],
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
      {
        mapPosition: {
          x: 3,
          y: 5
        },
        type: MAP_POSITION_TYPE.ROOM,
        canMoveTo: [DIRECTIONS.UP, DIRECTIONS.LEFT],
        freeMoveTo: [],
        hasGoal: false,
        hasGunBox: false,
        evacuatePosition: false,
        zombieSpawnByRound: false,
        zombieSpawnInitial: 0,
      },
    ]
  }

}

export function zombieCards() {
  return [
    {
      name: 'CORREDORES',
      quantity: {
        blue: 1,
        yellow: 1,
        orange: 2,
        red: 3
      }
    },
    {
      name: 'BALOFOS',
      quantity: {
        blue: 1,
        yellow: 1,
        orange: 2,
        red: 3
      }
    },
    {
      name: 'LERDOS',
      quantity: {
        blue: 1,
        yellow: 1,
        orange: 2,
        red: 3
      }
    },
  ]
}