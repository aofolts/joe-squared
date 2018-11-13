import {graphql} from 'gatsby'
import React, { Fragment } from 'react'
import Wrap from '../components/wrap'
import { withLayout } from '../components/layout'
import Hero from '../components/hero'
import css from '../less/archive-blog.module.less'
import Content from '../components/Content'
import BlogCard from '../components/card-blog'

const BasicContent = ({
  layout
}) => {
  const html = layout.markdown.childMarkdownRemark.html

  return (
    <Wrap width='small' style={{textAlign: 'center'}}>
      <Content html={html} />
    </Wrap>
  )
}

const ArchiveSection = ({posts,activePostType}) => {
  const cards = posts.map(post => {
    const {
      id
    } = post

    const wrapClasses = [
      css.cardWrap
    ].join(' ')

    return (
      <div key={id} className={wrapClasses}>
        <BlogCard post={post}/>
      </div>
    )
  })

  return (
    <section className={css.archiveSection}>
      <Wrap>
        <div className='thirdsGrid'>
          {cards}
        </div>
      </Wrap>
    </section>
  )
}

class CommunityPageTemplate extends React.Component {
  
  render() {
    const {
      page,
      allContentfulBlogPost
    } = this.props.data

    const posts = allContentfulBlogPost.edges.map(post => {
      return post.node
    })

    const {
      title,
      layout,
      featuredImage
    } = page

    return (
      <Fragment>
        <Hero title={title} background={featuredImage} />
        <BasicContent {...{layout}}/>
        <ArchiveSection {...{posts}}/>
      </Fragment>
    )
  }
}

export default withLayout(CommunityPageTemplate)

export const pageQuery = graphql`
  {
    page: contentfulPage(slug: {eq: "community"}) {
      ...PageFields
      layout {
        ...MarkdownFragment
      }
    }
    allContentfulBlogPost(limit:9) {
      edges {
        node {
          id
          title
          slug
          featuredImage {
            title
            sizes(maxWidth: 1920) {
              ...GatsbyContentfulSizes
            }
          }
          ...BlogPostContent
          category {
            name
            slug
          }
        }
      }
    }
  }
`