import React, { useEffect, useState } from 'react'
import styles from '../../styles/votingplatform.module.css'
import DogCard from './DogCard'
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useClerk } from '@clerk/clerk-react';

export default function VotingPlatform() {

    const dogs = useQuery(api.dogs.getDogsDemo);
    const updateDogScore = useMutation(api.dogs.updateScoreDemo);

    const [currDog, setCurrDog] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState(0);
    const [autoSwipe, setAutoSwipe] = useState(0);

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
        setAutoSwipe(0);
    }

    const handleBtnSwipe = (direction : string) => {
        if(direction === 'left'){
            setAutoSwipe(-1)
        } else if (direction === 'right') {
            setAutoSwipe(1)
        } else {
            setAutoSwipe(0)
        }
    }

    useEffect(() => {
        if(swipeDirection === -1) {
            updateDogScore({id: dogs ? dogs[currDog]._id : '', score: dogs ? dogs[currDog].score - 1 : 0});
            setTimeout(() => {
                dogs?.length && (currDog + 1 <= dogs?.length ? setCurrDog(currDog + 1) : setCurrDog(0) );
                setSwipeDirection(0);
            }, 500)
        }
        else if(swipeDirection === 1) {
            updateDogScore({id: dogs ? dogs[currDog]._id : '', score: dogs ? dogs[currDog].score + 1 : 0});
            setTimeout(() => {
                dogs?.length && (currDog + 1 <= dogs?.length ? setCurrDog(currDog + 1) : setCurrDog(0) );
                setSwipeDirection(0);
            }, 500)
        }
        
    }, [swipeDirection]);

    if(!dogs) return;

    return (
        <div className={styles.voting_platform_container}>
            {
                (dogs[currDog]) ? 
                <DogCard 
                    key={dogs[currDog]._id} 
                    name={dogs[currDog].name} 
                    img={dogs[currDog].url} 
                    swipe={handleSwipeDirection}
                    autoSwipe={autoSwipe}
                />
                : <p>No More Dogs</p>
            }

         <div className={styles.vote_btn_container}>
                <Button 
                    sx={autoSwipe === -1 || swipeDirection === -1 ? leftVotingBtnActiveSx : leftVotingBtnSx} 
                    disabled={swipeDirection !== 0 || !(dogs && dogs[currDog])} 
                    variant='outlined'
                    onClick={() => handleBtnSwipe('left')}
                    onTouchStart={() => handleBtnSwipe('left')}
                >
                    <NotInterestedIcon sx={{fontSize: '2rem'}}/>
                </Button>
                <Button 
                    sx={autoSwipe === 1 || swipeDirection === 1 ? rightVotingBtnActiveSx : rightVotingBtnSx} 
                    disabled={swipeDirection !== 0 || !(dogs && dogs[currDog])} 
                    variant='outlined'
                    onClick={() => handleBtnSwipe('right')}
                    onTouchStart={() => handleBtnSwipe('right')}
                >
                    <FavoriteIcon sx={{fontSize: '2rem'}}/>
                </Button>   
            </div>
        </div>
    )
}
