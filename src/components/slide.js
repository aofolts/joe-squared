import React from 'react'
import Link from './link'
import Image from 'gatsby-image'
import css from '../less/slide.module.less'

const Buttons = ({buttons}) => {
  const buttonElements = buttons.map((button,i) => {
    const {
      label,
      link: url,
      page
    } = button

    const buttonClasses = [
      css.button,
      css[`button${i + 1}`],
      'primaryButton'
    ].join(' ')

    return (
      <Link 
        key={label}
        className={buttonClasses}
        url={url}
        page={page}
      >
        {label}
      </Link>
    )
  })

  return (
    <div className={css.buttons}>
      {buttonElements}
    </div>
  )
}

const Slide = ({slide,slideState}) => {
  const {
    image,
    headline,
    buttons
  } = slide

  const imageEl = (
    <Image  
      className={['mediaBackground',css.slideBackground].join(' ')}
      sizes={image.sizes}
      alt={image.title}
    />
  )

  const slideClasses = [
    css.slide,
    css[`${slideState}Slide`],
    slideState
  ].join(' ')

  return (
    <div className={slideClasses} key={slide.id}>
      {imageEl}
      <div className={css.slideContent}>
        <h2 className={[css.slideHeadline,'balance-text'].join(' ')}>{headline}</h2>
        <Buttons buttons={buttons} />
      </div>
    </div>
  )
}

export default Slide

