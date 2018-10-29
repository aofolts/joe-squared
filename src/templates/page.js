import {graphql} from 'gatsby'
import React, { Fragment } from 'react'
import { withLayout } from '../components/layout'
import Hero from '../components/hero'
import RichText from '../components/rich-text'

// const MarkdownLayout = props => {
//   const html = props.layout.markdown.childMarkdownRemark.html

//   return (
//     <Wrap width='small'>
//       <Content html={html} />
//     </Wrap>
//   )
// }

// const LayoutContent = props => {
//   const {layout} = props

//   const {
//     __typename: layoutType
//   } = layout

//   switch (layoutType) {
//     case 'ContentfulLayoutGallery': return <GalleryContent layout={layout}/>;
//     case 'ContentfulMarkdown':      return <MarkdownLayout layout={layout}/>;
//     default: return <h2>No Layout</h2>
//   }
// }

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

    const content = layout[0].markdown.childMarkdownRemark.html

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
    featuredImage {
      title
      sizes(maxWidth: 1920) {
        ...GatsbyContentfulSizes
      }
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