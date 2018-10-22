import {graphql} from 'gatsby'
import React, {Component} from 'react'
import Wrap from '../components/wrap'
import Layout from '../components/layout'
import Hero from '../components/hero'
//import css from '../less/archive-blog.module.less'
import RichText from '../components/rich-text'

const PostBody = ({markdown}) => {
  const html = markdown.childMarkdownRemark.html

  return (
    <Wrap width='small'>
      <RichText html={html}/>
    </Wrap>
  )
}

class SingleEvent extends Component {

  render() {
    const {
      event
    } = this.props.data
  
    const {
      title,
      content,
      featuredImage
    } = event

    const seo = {
      title,
      description: content.childMarkdownRemark.excerpt
    }
  
    return (
      <Layout seo={seo}>
        <Hero title={title} background={featuredImage} />
        <PostBody markdown={content}/>
      </Layout>
    )
  }
}

export default SingleEvent

export const pageQuery = graphql`
  query EventBySlug($slug: String!) {
    event: contentfulEvent(slug: {eq: $slug}) {
      ...EventInfo
      featuredImage {
        title
        sizes(maxWidth: 1920) {
          ...GatsbyContentfulSizes
        }
      }
    }
  }
`

export const EventInfoFragment = graphql`
  fragment EventInfo on ContentfulEvent {
    id
    title
    slug
    day: eventDate(formatString:"D")
    month: eventDate(formatString: "MMM")
    ...EventCategory
    ...EventContent
  }
`

export const EventContentFragment = graphql`
  fragment EventContent on ContentfulEvent {
    content {
      childMarkdownRemark {
        excerpt
        html
      }
    }
  }
`

export const EventCategoryFragment = graphql`
  fragment EventCategory on ContentfulEvent {
    category {
      id
      name
      slug
    }
  }
`