import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PetsIcon from '@mui/icons-material/Pets';

import styles from '../styles/footer.module.css'
import { Button, Dialog, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import AddDogDialog from './AddDogDialog';

export default function Footer() {

	const [openAddDog, setOpenAddDog] = useState(false);
	const [openLeaderboard, setOpenLeaderboard] = useState(false);

	const handleDialogOpen = (operation : string) => {
		if(operation === 'Add Dog'){
			setOpenAddDog(true);
			setOpenLeaderboard(false);
		} else if (operation === 'Leaderboard') {
			setOpenLeaderboard(true);
			setOpenAddDog(false);
		} else {
			setOpenAddDog(false);
			setOpenLeaderboard(false);
		}
	}

	const handleDialogClose = () => {
		setOpenAddDog(false);
		setOpenLeaderboard(false);
	}

    const actions = [
        { icon: <AddIcon />, name: 'Add Dog' },
        { icon: <LeaderboardIcon />, name: 'Leaderboard'},
    ];

    return (
		<>
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
					onClick={() => handleDialogOpen(action.name)}
				/>
				))}
			</SpeedDial>
			<Dialog id='add-dog-dialog' open={openAddDog} onClose={handleDialogClose}>
				<AddDogDialog close={handleDialogClose}/>
			</Dialog>
			<Dialog id='leaderboard-dialog' open={openLeaderboard} onClose={handleDialogClose}>
				<p>Leaderboard</p>
			</Dialog>
		</>
        
    )
}
