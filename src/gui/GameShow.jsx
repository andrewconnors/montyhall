import React, { useState } from 'react';
import { createActor } from 'xstate';

import {montyHallMachine} from './states'
import './Styles.css';

const Door = ({ isOpen, selected, emoji }) => {
  return (
    <div className={`door ${isOpen ? 'open' : 'closed'} ${selected ? 'selected' : ''}`}>
      {isOpen ? <span role="img" aria-label="emoji">{emoji}</span> : null}
    </div>
  );
};

const GameShow = () => {
  const [doors, setDoors] = useState([
    { isOpen: false, selected: false, emoji: '🐮' },
    { isOpen: false, selected: false, emoji: '🚪' },
    { isOpen: false, selected: false, emoji: '🐮' }
  ]);
  const [instructions, setInstructions] = useState()

  const gameShowActor = createActor(montyHallMachine);

  gameShowActor.subscribe((state) => {
      console.log(state.context.text)
  })

  const revealDoor = (index) => {
    setDoors((prevDoors) => {
      const newDoors = [...prevDoors];
      newDoors[index].isOpen = true;
      return newDoors;
    });
  };

  const selectDoor = (index) => {
    setDoors((prevDoors) => {
        const newDoors = [...prevDoors];
        newDoors[index].selected = true;
        return newDoors;
      });
  }

  return (
    <div className="gameShow">
      <h1>Monty Hall</h1>
      <div className="doors-container">
        {doors.map((door, index) => (
          <div key={index} onClick={() => selectDoor(index)}>
            <Door isOpen={door.isOpen} emoji={door.emoji} selected={door.selected}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameShow;