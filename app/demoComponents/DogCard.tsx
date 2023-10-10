import React, { useEffect, useState } from 'react'
import styles from '../styles/dogcard.module.css'
import Image from 'next/image'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api';

interface DogCardProps {
  name: string,
  img: string,
  swipe: (direction: number, threshold: number) => void,
  autoSwipe: number
}

export default function DogCard({name, img, swipe, autoSwipe} : DogCardProps) {

  const [springs, springApi] = useSpring(() => ({
    from: { x: 0, rotate: 0, opacity: 1 },
  }))

  const bind = useDrag(({ down, movement: [mx] }) => {

    const rotateDeg = 30;
    const rotateThreshold = 50;

    const rotation = mx > rotateThreshold ? rotateDeg : mx < (-1 * rotateThreshold) ? (-1 * rotateDeg) : 0;

    if(!down && (mx > rotateThreshold || mx < (-1 * rotateThreshold))) {
      springApi.start({
        x: mx * 2,
        opacity: 0
      })

      swipe(mx, rotateThreshold);

      setTimeout(() => {
        springApi.start({
          x: 0,
          rotate: 0
        });
      }, 500);
    }
    else if (!down && (mx < rotateThreshold && mx > (-1 * rotateThreshold))) {
      springApi.start({
        x: 0
      })
    } else {
      springApi.start({
          x: mx,
          rotate: rotation
        })
    }
  })

  useEffect(() => {

    const threshold = 50;
    const autoLeft = -51;
    const autoRight = 51;
    const rotateDeg = 30;

    if(autoSwipe === 1) {
      springApi.start({
        x: autoRight * 2,
        rotate: rotateDeg,
        opacity: 0
      })

      swipe(autoRight, threshold);

      setTimeout(() => {
        springApi.start({
          x: 0,
          rotate: 0
        });
      }, 500);

    } else if (autoSwipe === -1) {
      springApi.start({
        x: autoLeft * 2,
        rotate: -1 * rotateDeg,
        opacity: 0
      })

      swipe(autoLeft, threshold);

      setTimeout(() => {
        springApi.start({
          x: 0,
          rotate: 0
        });
      }, 500);
    }


  }, [autoSwipe])

  return (
    <animated.div {...bind()} style={{...springs, touchAction: 'none', cursor: 'pointer'}} className={styles.dog_card_container}>
        <Image 
          loader={() => img} priority unoptimized src={img} alt='dog image' fill style={{pointerEvents: 'none', objectFit: 'cover'}}/>
        <b className={styles.dog_name}>{name?.toUpperCase()}</b>
    </animated.div>
  )
}
