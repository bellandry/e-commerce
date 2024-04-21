'use client'

import Link from 'next/link'

import { Product } from '../../../payload/payload-types'
import { Card } from '../Card'

import classes from './index.module.scss'

const Products = ({ products }: { products: Product[] }) => {
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Nos Articles</h3>
        <Link href="/products">Tout voir </Link>
      </div>

      <div className={classes.list}>
        {products.map((product, index) => (
          <div key={index}>
            <Card relationTo="products" doc={product} showCategories />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Products
