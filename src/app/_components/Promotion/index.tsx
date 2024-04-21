'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { Button } from '../Button'

import classes from './index.module.scss'

const Promotion = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 7)

    const intervalId = setInterval(() => {
      const now = new Date()
      const timeDiff = targetDate.getTime() - now.getTime()

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

      setTime({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>La grande promo de la semaine</h3>
        <p>
          Semaine de folie !🥳 C'est les cadeaux que tu veux voir ?? Durant toute cette semaine,
          pour tout achat d'un iPhone 15 Pro Max, recevez en bonnus une montre connecté et des
          AirPods 2 offert NDJO'O !!!!! 🎁🌟
        </p>
        <div className={classes.stats}>
          <StatBox value={time.days} label="Jours" />
          <StatBox value={time.hours} label="Heures" />
          <StatBox value={time.minutes} label="Minutes" />
          <StatBox value={time.seconds} label="Secondes" />
        </div>
        <Button
          href="/products"
          type="button"
          label="Voir les produits"
          el="link"
          appearance="primary"
        >
          <Image src="/assets/icons/arrow-right.svg" width={16} height={16} alt="arrow right" />
        </Button>
      </div>
    </section>
  )
}

const StatBox = ({ label, value }: { label: string; value: number }) => {
  return (
    <li className={classes.statBox}>
      <h4>{value}</h4>
      <p>{label}</p>
    </li>
  )
}

export default Promotion
