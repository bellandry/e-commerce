import { Metadata } from 'next'

import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'

import classes from './index.module.scss'

export default async function Account() {
  return (
    <div>
      <h5 className={classes.personalInfo}>Personal Information</h5>
      <AccountForm />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Mon compte',
  description: 'Créer un compte ou connectez vous à votre compte.',
  openGraph: mergeOpenGraph({
    title: 'Mon compte',
    url: '/account',
  }),
}
