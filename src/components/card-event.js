import css from '../less/blogCard.module.less'
import React from 'react'
import {graphql} from 'gatsby'

const EventCard = props => {
  const {post} = props

  const {
    id,
    name,
    featuredImage,
    description,
    start,
    url
  } = post

  const {
    text: title
  } = name

  const {
    monthAbbreviated: month,
    day
  } = start

  return (
    <a href={url} target='__blank'>
      <article key={id} className={css.card}>
        <div className={css.media}>
          <img className='mediaBackground' src={featuredImage.original.url} alt={title}/>
        </div>
        <div className={css.content}>
          <div className={css.category}>{month} {day}</div>
          <h3 className={css.title}>{title}</h3>
          <p className={css.excerpt}>
            {description.html}...<br/>
          </p>
          <p className={css.readMore}>Read More</p>
        </div>
      </article>
    </a>
  )
}

export default EventCard

export const EventInfoFragment = graphql`
  fragment EventInfo on EventbriteEvents {
    id
    name {
      text
    }
    description {
      html
    }
    url
    start {
      day: local(formatString: "D")
      monthAbbreviated: local(formatString: "MMM")
      time: local(formatString: "h:mma")
    }
    end {
      day: local(formatString: "D")
      monthAbbreviated: local(formatString: "MMM")
      time: local(formatString: "h:mma")
    }
    featuredImage: logo {
      id
      original {
        url
      }
    }
  }
`