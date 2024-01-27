import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import {useLocation, useNavigate} from 'react-router-dom';

import "./Styles.css"

const StatsScreen = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const handleReset = () => {
        navigate("/")
    }
    return (
        <div className="stats">
            <Typography variant="h2" gutterBottom color="common.black">Simulation Finished!</Typography>
            <Stack spacing={2} style={{textAlign: "left"}}>
                <Typography variant="body1" gutterBottom color="common.black">
                    Number of runs: {location.state.numRuns}
                </Typography>
                <Typography variant="body1" gutterBottom color="common.black">
                    Simulation Type: {location.state.simMode}
                </Typography>
                <Typography variant="body1" gutterBottom color="common.black">
                    Number of wins: {location.state.wins}
                </Typography>
                <Typography variant="body1" gutterBottom color="common.black">
                    Win percentage: {(location.state.wins / location.state.numRuns) * 100}
                </Typography>
                <div style={{textAlign: "center"}}>
                    <Button variant="contained" color="primary" onClick={handleReset}>
                        Reset
                    </Button>
                </div>
            </Stack>
        </div>
    )
}

export default StatsScreen;