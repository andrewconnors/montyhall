
const NUM_DOORS = 3
const Prize =  {
    GOAT: "goat",
    CAR: "car"
}
export class GameState {
    doors = []

    initialize() {
        this.doors = [
            Prize.GOAT,
            Prize.GOAT,
            Prize.GOAT
        ]
        const carIndex = Math.floor(Math.random() * NUM_DOORS)
        this.doors[carIndex] = Prize.CAR
    }
    getGameState() {
        return this.doors
    }
}

export class MontyHallGame {
    state = new GameState()
    choice = null
    reveal = null
    constructor() {
        this.state.initialize()
    }

    chooseAndReveal(num) {
        const currentState = this.state.getGameState()
        this.choice = num
        for (var i = 0; i < currentState.length; i++) {
            if(i == num) {
                continue
            }
            if (currentState[i] === Prize.GOAT) {
                this.reveal = i
                return i
            }
        }
    }

    switch() {
        if (this.choice === null) {
            console.error("You must choose an inital value before switching");
            return;
        }
        for (var i = 0; i<this.state.getGameState().length; i++) {
            if (i !== this.choice && i !== this.reveal) {
                this.choice = i
                return
            }
        }
    }

    checkWin() {
        return this.state.getGameState()[this.choice] == Prize.CAR
    }

    getChoice() {
        return this.choice
    }

    getState() {
        return this.state.getGameState()
    }

     
}

export const SimModes = {
    ALWAYS_SWITCH: "always_switch",
    NEVER_SWITCH: "never_switch",
    RANDOM: "random"
}

export class StatisticsManager {
    numRuns = 0
    simMode = SimModes.ALWAYS_SWITCH
    wins = 0

    newStat(win, mode) {
        this.numRuns += 1
        if (!win) {
            return
        }
        this.wins += 1
        this.simMode = mode
    }

    printStats(mode) {
        console.log(`Run Statistics:\nmode: ${mode}\nruns: ${this.numRuns}\nwins: ${this.wins}\npercentage: ${this.wins/this.numRuns*100}`)
    }
}

export class MontyHallSimulation {
    timesToRun = 0
    simMode
    game = null
    constructor(timesToRun, simMode) {
        this.timesToRun = timesToRun
        this.simMode = simMode
    }

    runSim(){
        const stats = new StatisticsManager()
        var switched = false
        for (var i = 0; i<this.timesToRun; i++) {
            // New Game
            this.game = new MontyHallGame()
            // Randomly choose first door
            const choice = Math.floor(Math.random() * NUM_DOORS)
            this.game.chooseAndReveal(choice)

            switch(this.simMode) {
                case SimModes.ALWAYS_SWITCH:
                    this.game.switch();
                    break;
                case SimModes.NEVER_SWITCH:
                    break;
                case SimModes.RANDOM:
                    switched = false
                    if(Math.random() > 0.5) {
                        this.game.switch()
                    }
                    break;
            }
            const win = this.game.checkWin()
            stats.newStat(win, this.simMode)
        }

        stats.printStats(this.simMode)
        return stats
    }
}