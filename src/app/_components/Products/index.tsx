// src/app/_components/Products/index.tsx
'use client'

import Link from 'next/link';

import { Product } from '../../../payload/payload-types';
import { Card } from '../Card'; // Ensure Card component is correctly implemented

import classes from './index.module.scss';

const Products = ({ products }: { products: Product[] }) => {
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <h3>Nos Articles</h3>
        <Link href="/products">Tout voir</Link>
      </div>

      <div className={classes.list}>
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <div key={index}>
              <Card relationTo="products" doc={product} showCategories />
            </div>
          ))
        ) : (
          <p>Aucun produit disponible.</p> // Message if no products are available
        )}
      </div>
    </section>
  );
};

export default Products;
