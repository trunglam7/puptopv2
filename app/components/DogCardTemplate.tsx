import React from 'react'
import styles from '../styles/dogcardtemplate.module.css'

interface DogCardTemplateProps {
  imageSource: string,
  name: string
}

export default function DogCard({imageSource, name} : DogCardTemplateProps) {
  return (
    <div className={styles.card_container}>
        <img className={styles.card_img} src={imageSource} />
        <p className={styles.dog_name}>{name}</p>
    </div>
  )
}
