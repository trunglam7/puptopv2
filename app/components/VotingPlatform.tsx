import React, { useEffect, useState } from 'react'
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
    const [score, setScore] = useState(0);
    const [currDog, setCurrDog] = useState(0);
    const [end, setEnd] = useState(false);

    const leftVotingBtnSx = {
        borderRadius: '2rem',
        '&:hover': {
            color: 'red',
            bgcolor: 'coral',
            borderColor: 'coral'
        }
    }

    const leftVotingBtnActiveSx = {
        borderRadius: '2rem',
        color: 'red',
        bgcolor: 'coral',
        borderColor: 'coral'
    }

    const rightVotingBtnSx = {
        borderRadius: '2rem',
        '&:hover': {
            color: 'green',
            bgcolor: 'aquamarine',
            borderColor: 'aquamarine'
        }
    }

    const rightVotingBtnActiveSx = {
        borderRadius: '2rem',
        color: 'green',
        bgcolor: 'aquamarine',
        borderColor: 'aquamarine'
    }

    const handleSwipeDirection = (direction : number, threshold: number) => {
        direction > threshold ? setSwipeDirection(1) : direction < (-1 * threshold) ? setSwipeDirection(-1): setSwipeDirection(0);
    }
    
    useEffect(() => {
        const currScore = score;
        const dogsLength = dogs?.length ? dogs.length : 0;
        if(swipeDirection === -1) {
            setScore(currScore - 1);

            setTimeout(() => {
                if(currDog + 1 < dogsLength) {
                    setCurrDog(currDog + 1);
                } else {
                    setEnd(true);
                }
                setSwipeDirection(0);
            }, 500)
        }
        else if(swipeDirection === 1) {
            setScore(currScore + 1);
            
            setTimeout(() => {
                if(currDog + 1 < dogsLength) {
                    setCurrDog(currDog + 1);
                } else {
                    setEnd(true);
                }
                setSwipeDirection(0);
            }, 500)
        }
    }, [swipeDirection]);

    return (
        <div className={styles.voting_platform_container}>
            {(dogs && !end) ? 
                <DogCard key={dogs[currDog]._id} name={dogs[currDog].name} img={dogs[currDog].img} swipe={handleSwipeDirection}/>
                : <p>No More Dogs</p>
            
            }
            <div className={styles.vote_btn_container}>
                <Button sx={swipeDirection === -1 ? leftVotingBtnActiveSx : leftVotingBtnSx} disabled={end} variant='outlined'>
                    <NotInterestedIcon sx={{fontSize: '2rem'}}/>
                </Button>
                <Button sx={swipeDirection === 1 ? rightVotingBtnActiveSx : rightVotingBtnSx} disabled={end} variant='outlined'>
                    <FavoriteIcon sx={{fontSize: '2rem'}}/>
                </Button>   
            </div>
        </div>
    )
}
