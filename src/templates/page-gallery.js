import {graphql} from 'gatsby'
import React, { Fragment } from 'react'
import { withLayout } from '../components/layout'
import Hero from '../components/hero'
import css from '../less/gallery.module.less'
import Image from 'gatsby-image'

const GalleryContent = ({photos}) => {
  const photoCards = photos.map(photo => {
    const {
      id,
      title,
      sizes
    } = photo
    
    return (
      <div key={id} className={css.item}>
        <Image 
          title={title}
          alt={title}
          sizes={sizes}
          className={'mediaBackground'}
        />
      </div>
    )
  })

  return (
    <div className='mainWrap'>
      <div className={css.grid}>
        {photoCards}
      </div>
    </div>
  )
}

class GalleryPage extends React.Component {
  
  render() {
    const {
      page
    } = this.props.data

    const {
      title,
      layout,
      featuredImage
    } = page

    const {
      photos
    } = layout

    return (
      <Fragment>
        <Hero title={title} background={featuredImage} />
        <GalleryContent {...{photos}}/>
      </Fragment>
    )
  }
}

export default withLayout(GalleryPage)

export const pageQuery = graphql`
  {
    page: contentfulPage(slug: {eq: "gallery"}) {
      ...PageFields
      layout {
        ...GalleryLayoutFields
      }
    }
  }
`

export const galleryLayoutFields = graphql`
  fragment GalleryLayoutFields on ContentfulLayoutGallery {
    photos {
      id
      title
      sizes(maxWidth: 600) {
        ...GatsbyContentfulSizes
      }
    }
  }
`
