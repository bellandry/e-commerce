"use client"

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Header } from '../../../../payload/payload-types';
import { useAuth } from '../../../_providers/Auth';
import { Button } from '../../Button';
import { CartLink } from '../../CartLink';
import { CMSLink } from '../../Link';

import classes from './index.module.scss';

const MobileNav = ({ header }: { header: Header }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = header?.navItems || []
  const { user } = useAuth()

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={classes.mobileNav}>
      <Image
        src="/assets/icons/menu.svg"
        alt="menu"
        width={24}
        height={24}
        onClick={handleMenuToggle}
      />

      {isMenuOpen && ( // Conditionally render menu based on state
        <nav
          className={[
            classes.navElt,
            isMenuOpen ? classes.navOpen : '',
            user === undefined && classes.hide,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {navItems.map(({ link }, i) => {
            return (
              <div key={i} onClick={handleMenuToggle}>
                <CMSLink {...link} appearance="none" />
              </div>
            )
          })}
          <div onClick={handleMenuToggle}>
            <CartLink />
          </div>
          {user && <Link href="/account" onClick={handleMenuToggle}>Mon compte</Link>}
          {!user && (
            <Button
              el="link"
              href="/login"
              label='Se connecter'
              appearance='primary'
              onClick={() => { (window.location.href = "/login"), handleMenuToggle }}
            />
          )}
        </nav>
      )}
    </div>
  )
}

export default MobileNav
