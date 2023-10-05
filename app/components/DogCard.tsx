import React from 'react'
import styles from '../styles/dogcard.module.css'
import Image from 'next/image'
import { useSpring, animated } from '@react-spring/web'
import { useDrag, useGesture } from '@use-gesture/react'

interface DogCardProps {
  name: string,
  img: string
}

export default function DogCard({name, img} : DogCardProps) {

  const [springs, api] = useSpring(() => ({
    from: { x: 0, rotate: 0 },
  }))

  const bind = useDrag(({ down, movement: [mx] }) => {

    const rotateDeg = 30;
    const rotateThreshold = 50;

    const rotation = mx > rotateThreshold ? rotateDeg : mx < (-1 * rotateThreshold) ? (-1 * rotateDeg) : 0;

    api.start({
      x: down ? mx : 0,
      rotate: rotation
    })
  })

  return (
    <animated.div {...bind()} style={{...springs, touchAction: 'none', cursor: 'pointer'}} className={styles.dog_card_container}>
        <Image src={img} alt='dog image' fill objectFit='cover' style={{pointerEvents: 'none'}}/>
        <b className={styles.dog_name}>{name?.toUpperCase()}</b>
    </animated.div>
  )
}
