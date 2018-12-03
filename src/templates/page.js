import {graphql} from 'gatsby'
import React, { Fragment } from 'react'
import { withLayout } from '../components/layout'
import Hero from '../components/hero'
import RichText from '../components/rich-text'

class Page extends React.Component {
  
  render() {
    const {
      page
    } = this.props.data

    const {
      title,
      layout,
      featuredImage
    } = page

    const content = layout.markdown.childMarkdownRemark.html

    return (
      <Fragment>
        <Hero title={title} background={featuredImage} />
        <section id='contentSection'>
          <div className='smallWrap'>
            <RichText html={content}/>
          </div>
        </section>
      </Fragment>
    )
  }
}

export default withLayout(Page)

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
      ...PageFields
      layout {
        ...MarkdownFragment
      }
    }
  }
`

export const PageFields = graphql`
  fragment PageFields on ContentfulPage {
    title,
    slug,
    internal {
      type
    }
    featuredImage {
      ...imageHero
    }
    seo {
      title
      description {
        description
      }
      keywords
    }
  }
`