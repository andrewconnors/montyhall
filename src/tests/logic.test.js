import {GameState, MontyHallGame, MontyHallSimulation, SimModes, Prize} from ("../logic/monty_hall")

// import GameState from "../logic/monty_hall"

test('gameInitialize', () => {
    const gs = new GameState()
    var initialState = gs.getGameState()
    gs.initialize()
    var newState = gs.getGameState()

    expect(initialState.length).toBe(0)
    expect(newState.length).toBe(3)
    expect(newState).toContain('car')
})

test('montyGame', () => {
    const game = new MontyHallGame()
    console.log("Game State")
    console.log(game.getState())
    // Randomly choose first door
    const choice = Math.floor(Math.random() * 3)
    const revealedDoor = game.chooseAndReveal(choice)
    console.log(`choice door ${game.getChoice()}`)
    console.log(`Revealing door ${revealedDoor}`)

    game.switch()
    console.log(`after switch: ${game.getChoice()}`)
})

test ('montySim', () => {
    const numRuns = 10
    const mhs = new MontyHallSimulation(numRuns, SimModes.NEVER_SWITCH)
    const runStats = mhs.runSim()
    expect(runStats).toBeTruthy()
    expect(runStats.numRuns).toBe(numRuns)
})

test('chooseAndReveal', () => {
    const game = new MontyHallGame()
    expect(game.state).toBeDefined()
    expect(game.state.doors).toHaveLength(3)

    const carIndex = game.state.doors.indexOf(Prize.CAR)
    const goatIndices = game.state.doors.reduce((a, e, i) => {
        if (e == Prize.GOAT) {
            a.push(i)
        }
        return a
    }, [])
    
    var reveal = game.chooseAndReveal(goatIndices[0])
    expect(reveal).toBe(goatIndices[1])

    reveal = game.chooseAndReveal(goatIndices[1])
    expect(reveal).toBe(goatIndices[0])

    reveal = game.chooseAndReveal(carIndex)
    expect(goatIndices.includes(reveal)).toBeTruthy()
})