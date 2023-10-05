import React, { useState } from 'react'
import styles from '../styles/votingplatform.module.css'
import DogCard from './DogCard'
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

export default function VotingPlatform() {

    const dogs = useQuery(api.dogs.getDogs);

    const [swipeDirection, setSwipeDirection] = useState(0);

    const leftVotingBtnSx = {
        borderRadius: '2rem',
        '&:hover': {
            color: 'red',
            bgcolor: 'coral',
            borderColor: 'coral'
        }
    }

    const rightVotingBtnSx = {
        borderRadius: '2rem',
        '&:hover': {
            color: 'green',
            bgcolor: 'aquamarine',
            borderColor: 'aquamarine'
        }
    }

    const handleSwipeDirection = (direction : number, threshold: number) => {
        direction > threshold ? setSwipeDirection(1) : direction < (-1 * threshold) ? setSwipeDirection(-1): setSwipeDirection(0);
    }

    console.log(swipeDirection);

    return (
        <div className={styles.voting_platform_container}>
            {dogs?.map(dog => <DogCard name={dog.name} img={dog.img} swipe={handleSwipeDirection}/>)}
            <div className={styles.vote_btn_container}>
                <Button sx={leftVotingBtnSx} variant='outlined'>
                    <NotInterestedIcon sx={{fontSize: '2rem'}}/>
                </Button>
                <Button sx={rightVotingBtnSx} variant='outlined'>
                    <FavoriteIcon sx={{fontSize: '2rem'}}/>
                </Button>   
            </div>
        </div>
    )
}
