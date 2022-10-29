const ABILITIES = {
  LISO: 'O Sobrevivente ignora zumbis enquanto realiza ações de movimento, e não gasta ações extras ao se mover para fora de uma zona que contém zumbis',
  PLUS1_AÇÃO: 'O Sobrevivente pode realizar + 1 ação',
  PLUS1_DICE_MELEE: 'O Sobrevivente pode jogar um dado a mais para ações corpo a corpo',
  PLUS1_COMBAT_ACTION: 'O Sobrevivente pode realizar + 1 ação de combate',
  PLUS1_MOVE: 'O Sobrevivente pode se mover + 1 vez',
  PLUS1_DICE_VALUE_COMBAT_ACTION: 'Após jogar os dados o valor total recebe + 1',
  SORTE: 'Após jogar os dados o valor total recebe + 1',

}

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
          name: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: ABILITIES.SORTE,
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
          name: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: ABILITIES.SORTE,
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
          name: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: ABILITIES.SORTE,
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
          name: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: ABILITIES.SORTE,
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
          name: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: ABILITIES.SORTE,
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
          name: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: ABILITIES.SORTE,
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
          name: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: ABILITIES.SORTE,
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
          name: ABILITIES.LISO,
          level: 'BLUE'
        },
        {
          name: ABILITIES.PLUS1_AÇÃO,
          level: 'YELLOW'
        },
        {
          name: ABILITIES.PLUS1_DICE_MELEE,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_COMBAT_ACTION,
          level: 'ORANGE'
        },
        {
          name: ABILITIES.PLUS1_MOVE,
          level: 'RED'
        },
        {
          name: ABILITIES.PLUS1_DICE_VALUE_COMBAT_ACTION,
          level: 'RED'
        },
        {
          name: ABILITIES.SORTE,
          level: 'RED'
        },
      ]
    },
  ]
}
