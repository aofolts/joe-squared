import React from 'react'
import {Link as GatsbyLink} from 'gatsby'
import PropTypes from 'prop-types'

const Link = ({
  page,
  url,
  className,
  children
}) => {
  if (page) {
    const type = page.internal.type.replace('Contentful','').toLowerCase()

    const slug = type === 'page'
      ? page.slug
      : `${type}/${page.slug}`

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