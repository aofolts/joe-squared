import React from 'react'
import {Link as GatsbyLink} from 'gatsby'
import PropTypes from 'prop-types'

export const getPagePath = page => {
  let base = ''
  let slug = page.slug

  switch (page.internal.type) {
    case 'ContentfulFoodCategory': base = 'food'; break;
    default: base = '';
  }

  if (slug === 'home') slug = ''

  return `${base}/${slug}`
}

export const getPageUrl = page => {
  const path = getPagePath(page)

  return `https://www.joesquared.com${path}`
}

const Link = ({
  page,
  url,
  className,
  children
}) => {
  if (page) {
    const slug = getPagePath(page)

    return (
      <GatsbyLink 
        className={className}
        to={`/${slug}`}
      >
        {children}
      </GatsbyLink>
    )
  }
  else if (url) {
    if (url[0] === '/') {
      return (
        <GatsbyLink 
          className={className}
          to={url}
        >
          {children}
        </GatsbyLink>
      )
    }
    else {
      return (
        <a 
          className={className}
          href={url}
          target='__black'
        >
          {children}
        </a>
      )
    }
  }
  else {
    return <div {...{className}}>{children}</div>
  }
}

Link.propTypes = {
  url: PropTypes.string
}

export default Link