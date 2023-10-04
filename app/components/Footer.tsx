import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PetsIcon from '@mui/icons-material/Pets';

import styles from '../styles/footer.module.css'
import { Button, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';

export default function Footer() {

    const actions = [
        { icon: <AddIcon />, name: 'Add Dog' },
        { icon: <LeaderboardIcon />, name: 'Leaderboard' },
    ];

    return (
        <SpeedDial
            ariaLabel="Speed Dial"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon sx={{color: 'white'}}/>}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
        </SpeedDial>
    )
}
