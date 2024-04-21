'use client'

import React, { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const error = searchParams.get('error')

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div>
      {error ? (
        <Fragment>
          <Message error={error} />
          <p>
            {`Votre paiement s'est déroulé avec succès mais une erreur est survenur pendant la finalisation de la commande. Veillez contacter notre service support pour résoudre ce problème.`}
          </p>
          <div className={classes.actions}>
            <Button href="/account" label="Mon compte" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="Tous mes achats"
              appearance="secondary"
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1>Merci de votre achat !</h1>
          <p>
            {`Votre commande a été confirmée, vous recevrez un mail de confirmation dans quelques instants. votre numéro de commande est : ${orderID}.`}
          </p>
          <div className={classes.actions}>
            <Button href={`/account/orders/${orderID}`} label="Voir la commande" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="Tous mes achats"
              appearance="secondary"
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}
