import React from 'react'
import styles from '../styles/dogcard.module.css'
import Image from 'next/image'
import { useSpring, animated } from '@react-spring/web'
import { useDrag, useGesture } from '@use-gesture/react'

export default function DogCard() {

  const [springs, api] = useSpring(() => ({
    from: { x: 0 },
  }))

  const bind = useDrag(({ down, movement: [mx] }) => {
    api.start({ x: down ? mx : 0})
  })

  return (
    <animated.div {...bind()} style={{...springs, touchAction: 'none'}} className={styles.dog_card_container}>
        <Image src='/koji.jpg' alt='dog image' fill objectFit='cover' style={{pointerEvents: 'none'}}/>
        <b className={styles.dog_name}>KOJI</b>
    </animated.div>
  )
}
