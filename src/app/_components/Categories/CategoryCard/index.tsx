'use client'

import Link from 'next/link'

import { Category, Media } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

const CategoryCard = ({ category }: { category: Category }) => {
  const media = category.media as Media
  const { setCategoryFilters } = useFilter()

  return (
    <section className={classes.card} style={{ backgroundImage: `url(${media?.url})` }}>
      <Link
        href="/products"
        className={classes.cardblur}
        onClick={() => setCategoryFilters([category.id])}
      >
        <p className={classes.title}>{category.title}</p>
      </Link>
    </section>
  )
}

export default CategoryCard
