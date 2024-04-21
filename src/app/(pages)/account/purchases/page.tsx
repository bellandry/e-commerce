import Link from 'next/link'

import { Product } from '../../../../payload/payload-types'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { formatDateTime } from '../../../_utilities/formatDateTime'
import { getMeUser } from '../../../_utilities/getMeUser'

import classes from './index.module.scss'

export default async function Purchases() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Vous devez être connecté pour accéder à cette page.',
    )}&redirect=${encodeURIComponent('/account')}`,
  })

  return (
    <div>
      <h5>Articles achetés</h5>
      <div>
        {user?.purchases?.length || 0 > 0 ? (
          <ul className={classes.purchases}>
            {user?.purchases?.map((purchase, index) => {
              return (
                <li key={index} className={classes.purchase}>
                  {typeof purchase === 'string' ? (
                    <p>{purchase} Test</p>
                  ) : (
                    <Link href={`/products/${(purchase as Product).slug}`} className={classes.item}>
                      <div className={classes.mediaWrapper}>
                        {!(purchase as Product).meta.image && (
                          <div className={classes.placeholder}>Aucune image</div>
                        )}
                        {(purchase as Product).meta.image &&
                          typeof (purchase as Product).meta.image !== 'string' && (
                            <Media
                              imgClassName={classes.image}
                              resource={(purchase as Product).meta.image}
                            />
                          )}
                      </div>
                      <div className={classes.itemDetails}>
                        <h6>{(purchase as Product).title}</h6>
                        <Price product={purchase as Product} />
                        <p className={classes.purchasedDate}>{`Acheté le: ${formatDateTime(
                          (purchase as Product).createdAt,
                        )}`}</p>
                      </div>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <div className={classes.noPurchases}>Vous n'avez encore effectué aucun achat.</div>
        )}
      </div>
    </div>
  )
}
