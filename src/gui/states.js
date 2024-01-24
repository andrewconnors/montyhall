import { createMachine, assign } from 'xstate';

export const montyHallMachine = createMachine({
  id: 'monty',
  initial: 'Select',
  context: {
      text: ''
  },
  states: {
    Select: {
        on: {'game.select': {
            actions: assign({
                text: ({ event }) => event.text,
              }),
            target: 'AskSwitch'
        }},
    },
    AskSwitch: {
        on: {'game.switchDecision': {
            target: 'Result',
            actions: assign({
                text: ({ event }) => event.text,
              }),
        }}
    },
    Result: {
        on: {'game.reset': {
            target: 'Select',
            actions: assign({
                text: ({ event }) => event.text,
              }),
        }}
    }
  },
});