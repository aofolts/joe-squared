import Image from 'gatsby-image'
import PropTypes from 'prop-types'
import React from 'react'

import css from '../less/hero-secondary.module.less'

const Hero = props => {
  const {background,title} = props

  return (
    <section id='hero' className={css.hero}>
      <Image 
        sizes={background.sizes}
        className={['mediaBackground',css.background].join(' ')}
      />
      <div className={css.content}>
        <h1 className={[css.headline,'balance-text'].join(' ')}>{title}</h1>
      </div>
    </section>
  )
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  background: PropTypes.object.isRequired
}

export default Hero