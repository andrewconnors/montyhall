import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl,InputLabel,Stack, Typography } from '@mui/material';
import { grey, red } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import './Styles.css';
import { MontyHallSimulation } from "../logic/monty_hall"

const HomeScreen = () => {
  const [numRuns, setNumRuns] = useState('');
  const [simulationType, setSimulationType] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleNumRunsChange = (e) => {
    setNumRuns(e.target.value);
  };

  const handleSimulationTypeChange = (e) => {
    setSimulationType(e.target.value);
  };

  const validate = () => {
      console.log("Hey what")
      return (numRuns !== '' && simulationType !== '')
  }

  const handleSimulateClick = () => {
    if(!validate()) {
        setError("Please specify a number of runs and simulation type")
        return
    }
    const mh = new MontyHallSimulation(numRuns, simulationType)
    const stats = mh.runSim()
    navigate("/stats", {state: {numRuns: stats.numRuns, simMode: stats.simMode, wins: stats.wins}})
  };

  return (
    <div className="home">
      <Typography variant="h2" gutterBottom color={grey[900]}>Monty Hall Simulator.</Typography>
      <Stack spacing={2}>
        <FormControl>
            <TextField
                id="numRuns"
                type="number"
                value={numRuns}
                onChange={handleNumRunsChange}
                variant="outlined"
                label="Number of Runs"
            />
        </FormControl>
        <FormControl>
            <InputLabel htmlFor="simulationType">Simulation type</InputLabel>
            <Select
                label="Simulation type"
                id="simulationType"
                value={simulationType}
                onChange={handleSimulationTypeChange}
            >
                <MenuItem value="alwaysSwitch">Always Switch</MenuItem>
                <MenuItem value="neverSwitch">Never Switch</MenuItem>
                <MenuItem value="random">Random</MenuItem>
            </Select>
        </FormControl>
        <Typography variant="caption" color={red[600]}>{error}</Typography>
        <Button variant="contained" color="primary" onClick={handleSimulateClick}>
            Simulate
        </Button>
      </Stack>
      
    </div>
  );
};

export default HomeScreen;
