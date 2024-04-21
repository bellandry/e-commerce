import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { RenderParams } from '../../_components/RenderParams'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { RecoverPasswordForm } from './RecoverPasswordForm'

import classes from './index.module.scss'

export default async function RecoverPassword() {
  return (
    <section className={classes.recoverPassword}>
      <div className={classes.heroImg}>
        <Link href="/">
          <Image
            src="/logo-black.svg"
            width={170}
            height={50}
            alt="Laclass Tech Store Logo"
            className={classes.logo}
          />
        </Link>
      </div>
      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <Link href="/login" className={classes.backLink}>
            <Image
              src="/assets/icons/arrow-left.svg"
              width={24}
              height={24}
              alt="retour a l'accueil"
            />
            <p>Retour</p>
          </Link>
          <div className={classes.formTitle}>
            <h3>Mot de passe oublié</h3>
          </div>
          <RecoverPasswordForm />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Mot de passe oublié',
  description: 'Entrez votre adresse email pour retrouver votre compte',
  openGraph: mergeOpenGraph({
    title: 'Recover Password',
    url: '/recover-password',
  }),
}
