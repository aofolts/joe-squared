import css from '../less/blogCard.module.less'
import React from 'react'
import {Link,graphql} from 'gatsby'
import Image from 'gatsby-image'

const EventCard = props => {
  const {post} = props

  const {
    featuredImage,
    category,
    day,
    month
  } = post

  return (
    <Link to={`/events/${post.slug}`}>
      <article key={post.id} className={css.card}>
        <div className={css.media}>
          <Image 
            sizes={featuredImage.sizes}
            className={'mediaBackground'}
          />
        </div>
        <div className={css.content}>
          <div className={css.category}>{category.name} — {month} {day}</div>
          <h3 className={css.title}>{post.title}</h3>
          <p className={css.excerpt}>
            {post.content.childMarkdownRemark.excerpt}...<br/>
          </p>
          <p className={css.readMore}>Read More</p>
        </div>
      </article>
    </Link>
  )
}

export default EventCard

export const EventCardFragment = graphql`
  fragment EventCard on ContentfulEvent {
    ...EventInfo
    featuredImage {
      title
      sizes(maxWidth: 400) {
        ...GatsbyContentfulSizes
      }
    }
  }
`