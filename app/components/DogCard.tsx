import React from 'react'
import styles from '../styles/dogcard.module.css'
import Image from 'next/image'

export default function DogCard() {
  return (
    <div className={styles.dog_card_container}>
        <Image src='/koji.jpg' alt='dog image' fill objectFit='cover'/>
        <b className={styles.dog_name}>KOJI</b>
    </div>
  )
}
