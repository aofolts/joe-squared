import {graphql} from 'gatsby'
import React, {Component} from 'react'
import Wrap from '../components/wrap'
import Layout from '../components/layout'
import Hero from '../components/hero'
//import css from '../less/archive-blog.module.less'
import RichText from '../components/rich-text'

const PostBody = ({
  markdown,
  month,
  day,
  time
}) => {
  const html = markdown.childMarkdownRemark.html

  return (
    <Wrap width='small'>
      <p><b>When:</b> {month.toUpperCase()} {day}, {time}</p>
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
      featuredImage,
      month,
      day,
      time
    } = event

    const seo = {
      title,
      description: content.childMarkdownRemark.excerpt,
      keywords: [title]
    }
  
    return (
      <Layout seo={seo}>
        <Hero title={title} background={featuredImage} />
        <PostBody markdown={content} {...{month,day,time}}/>
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
    ...eventBasicFields
    day: eventDate(formatString:"D")
    month: eventDate(formatString: "MMM")
    time: eventDate(formatString: "h:mma")
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

export const eventBasicFields = graphql`
  fragment eventBasicFields on ContentfulEvent {
    title
    slug
    id
  }
`