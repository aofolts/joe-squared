import Section from './section'
import Wrap from './wrap'
import React from 'react'

import css from '../less/footer.module.less'
import twitterSrc from '../../static/img/icon-social-twitter.svg'
import instagramSrc from '../../static/img/icon-social-instagram.svg'
import facebookSrc from '../../static/img/icon-social-facebook.svg'

const NewsletterForm = props => (
  <form action="https://my.zenreach.com/api/widgets/submit_customer/" method="post" encType="application/x-www-form-urlencoded" target='_blank'>
    <input className={css.input} type="hidden" name="business_id" value="5a0b07627c331300095e165c"/>
    <input className={css.input} type="hidden" name="tags" value="website"/>
    <div className={css.field}>
      <label htmlFor='footer-newsletter-name'></label>
      <input className={css.input} type='text' id='footer-newsletter-name' name='fullname' placeholder='Name' />
    </div>
    <div className={css.field}>
      <label htmlFor='footer-newsletter-email'></label>
      <input className={css.input} type='email' id='footer-newsletter-email' name='email' placeholder='Email' />
    </div>
    <button type='submit' className={css.submit}>Subscribe →</button>
  </form>
)

const Newsletter = props => {
  return (
    <Section name='footer-newsletter'>
      <Wrap width='medium'>
        <div className={[css.newsletterGrid,'halvesGrid'].join(' ')}>
          <div className='content'>
            <h2>Stay in the Know</h2>
            <p>Sign up for our weekly newsletter for the latest on upcoming shows, events, sweet deals, and tasty recipes from Joe. </p>
          </div>
          <div className='form'>
            <NewsletterForm/>
          </div>
        </div>
      </Wrap>
    </Section>
  )
}

const FooterBar = props => {
  const social = {
    facebook: {
      url: 'https://www.facebook.com/joesquared',
      src: facebookSrc
    },
    twitter: {
      url: 'https://twitter.com/joesquared',
      src: twitterSrc
    },
    instagram: {
      url: 'https://www.instagram.com/joesquaredpizza',
      src: instagramSrc
    }
  }

  const icons = Object.keys(social).map(name => {
    const {
      url,
      src
    } = social[name]

    return (
      <a key={name} className={css.socialLink} href={url} target='_blank' rel='noopener noreferrer'>
        <img 
          className={css.socialIcon}
          alt={`${name} icon`} 
          key={name}
          src={src}
        />
      </a>
    )
  })

  return (
    <div id='footerBar' className={css.bar}>
      <div id='copyright' className={css.barItem}>©2018 Joe Squared</div>
        <div id='credit' className={css.barItem}>
          Site by <a href='http://sherpadesign.co' target='__blank' rel='noopener noreferrer' className={css.creditLink}>Sherpa Design Co.</a>
        </div>
        <div className={[css.barItem,css.social].join(' ')}>
          {icons}
        </div>
    </div>
  )
}

const Footer = props => {
  return (
    <footer id='footer' className={css.footer}>
      <Newsletter />
      <FooterBar/>
    </footer>
  )
}

export default Footer