'use client'

import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../AddToCartButton'
import { RemoveFromCartButton } from '../RemoveFromCartButton'

import classes from './index.module.scss'

export const priceFromJSON = (
  priceJSON: string,
  quantity: number = 1,
  targetCurrency: string = 'EUR',
  raw?: boolean,
): string => {
  let price = ''

  if (priceJSON) {
    try {
      const parsed = JSON.parse(priceJSON)?.data[0]
      const priceValue = parsed.unit_amount * quantity
      const priceType = parsed.type

      if (raw) return priceValue.toString()

      let currency = 'EUR' // Devise par défaut
      if (parsed.currency) {
        currency = parsed.currency.toUpperCase()
      }

      // Conversion en devise cible
      let convertedPriceValue = priceValue
      if (currency !== targetCurrency) {
        // Conversion vers EUR
        if (currency === 'USD') {
          convertedPriceValue /= 1.18 // Conversion approximative USD vers EUR
        } else if (currency === 'CAD') {
          convertedPriceValue /= 0.73 // Conversion approximative CAD vers EUR
        } else if (currency === 'XAF') {
          convertedPriceValue /= 655.96 // Conversion approximative XAF vers EUR
        }

        // Conversion de EUR vers la devise cible
        if (targetCurrency === 'USD') {
          convertedPriceValue *= 1.18 // Conversion approximative EUR vers USD
        } else if (targetCurrency === 'CAD') {
          convertedPriceValue *= 0.73 // Conversion approximative EUR vers CAD
        } else if (targetCurrency === 'XAF') {
          convertedPriceValue *= 655.96 // Conversion approximative EUR vers XAF
        }
      }

      price = (convertedPriceValue / 100).toLocaleString('fr-FR', {
        style: 'currency',
        currency: targetCurrency,
      })

      if (priceType === 'recurring') {
        price += `/${
          parsed.recurring.interval_count > 1
            ? `${parsed.recurring.interval_count} ${parsed.recurring.interval}`
            : parsed.recurring.interval
        }`
      }
    } catch (e) {
      console.error(`Cannot parse priceJSON`) // eslint-disable-line no-console
    }
  }

  return price
}

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
}> = props => {
  const { product, product: { priceJSON } = {}, button = 'addToCart', quantity } = props

  const [price, setPrice] = useState<{
    actualPrice: string
    withQuantity: string
  }>(() => ({
    actualPrice: priceFromJSON(priceJSON, 1, 'XAF'),
    withQuantity: priceFromJSON(priceJSON, quantity, 'XAF'),
  }))

  useEffect(() => {
    setPrice({
      actualPrice: priceFromJSON(priceJSON, 1, 'XAF'),
      withQuantity: priceFromJSON(priceJSON, quantity, 'XAF'),
    })
  }, [priceJSON, quantity])

  return (
    <div className={classes.actions}>
      {typeof price?.actualPrice !== 'undefined' && price?.withQuantity !== '' && (
        <div className={classes.price}>
          <p>{price?.withQuantity}</p>
          {quantity > 1 && (
            <small className={classes.priceBreakdown}>{`${price.actualPrice} x ${quantity}`}</small>
          )}
        </div>
      )}
      {/* {button && button === 'addToCart' && (
        <AddToCartButton product={product} appearance="default" />
      )}
      {button && button === 'removeFromCart' && <RemoveFromCartButton product={product} />} */}
    </div>
  )
}
