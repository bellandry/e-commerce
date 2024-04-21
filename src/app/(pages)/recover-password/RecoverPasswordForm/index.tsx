'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'

import classes from './index.module.scss'

type FormData = {
  email: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError("Une erreur inatendue est survenue durant l'opération, veuillez réessayer.")
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <p>
            Renseignez l'adresse mail correspondant à votre compte. Nous vous enverons un code de
            réinitialisation
          </p>
          <div className={classes.formWrapper}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <Message error={error} className={classes.message} />
              <Input
                name="email"
                label="Adresse Email"
                required
                register={register}
                error={errors.email}
                type="email"
              />
              <Button
                type="submit"
                appearance="primary"
                label="Retrouver mon mot de passe"
                className={classes.submit}
              />
            </form>
          </div>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <h1>Requette transmise</h1>
          <p>
            Vérifiez vos mails, nous vous avons envoyé un lien qui vous permettra de retrouver votre
            compte.
          </p>
        </React.Fragment>
      )}
    </Fragment>
  )
}
