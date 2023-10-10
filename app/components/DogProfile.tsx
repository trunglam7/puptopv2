import Image from 'next/image'
import React from 'react'
import styles from '../styles/dogprofile.module.css'

interface DogProfileProps {
    name: string,
    img: string
}

export default function DogProfile({name, img} : DogProfileProps) {
  return (
    <div className={styles.dog_profile_container}>
        <div className={styles.dog_profile_img}>
            <Image loader={() => img} src={img} alt='dog profile' fill style={{objectFit: 'cover'}} unoptimized/>
        </div>
        <p>{name}</p>
    </div>
  )
}
