'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import CartItem from '../CartItem'

import classes from './index.module.scss'

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()

  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart()

  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className={classes.empty}>
              Votre panier est vide
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link href={`/${productsPage.slug}`}>Cliquez ici</Link>
                  {` pour parcourir nos produits`}
                </Fragment>
              )}
              {!user && (
                <Fragment>
                  {' '}
                  <Link href={`/login?redirect=%2Fcart`}>Connectez vous</Link>
                  {` pour voir votre panier personnel.`}
                </Fragment>
              )}
            </div>
          ) : (
            <div className={classes.cartWrapper}>
              <div>
                <div className={classes.itemsTotal}>
                  {`Vous avez ${cart?.items?.length} article${
                    cart?.items?.length === 1 ? '' : 's'
                  } dans votre panier.`}
                  {!user && (
                    <Fragment>
                      {' '}
                      <Link href={`/login?redirect=%2Fcart`}>Connectez vous</Link>
                      {` pour enregistrer vos achats`}
                    </Fragment>
                  )}
                </div>
                <div className={classes.header}>
                  <p>Article</p>
                  <div className={classes.headerItemDetails}>
                    <p></p>
                    <p></p>
                    <p>Quantité</p>
                  </div>
                  <p className={classes.headersubtotal}>Total</p>
                </div>

                <ul className={classes.itemsList}>
                  {cart?.items?.map((item, index) => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { id, title, meta, stripeProductID },
                      } = item

                      const isLast = index === (cart?.items?.length || 0) - 1

                      const metaImage = meta?.image

                      return (
                        <CartItem
                          product={product}
                          title={title}
                          metaImage={metaImage}
                          index={index}
                          quantity={quantity}
                          addItemToCart={addItemToCart}
                        />
                      )
                    }
                    return null
                  })}
                </ul>
              </div>

              <div className={classes.summary}>
                <div className={classes.row}>
                  <h6 className={classes.cartTotal}>Résumé</h6>
                </div>
                <div className={classes.row}>
                  <p className={classes.cartTotal}>Frais de livraison</p>
                  <p className={classes.cardTotal}>0 FCFA</p>
                </div>
                <div className={classes.row}>
                  <p className={classes.cartTotal}>Total à payer</p>
                  <p className={classes.cardTotal}>{cartTotal.formatted}</p>
                </div>
                <Button
                  className={classes.checkoutButton}
                  href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                  label={user ? 'Payer' : 'Connectez vous pour payer'}
                  appearance="primary"
                />
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
