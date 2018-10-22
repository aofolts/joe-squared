import {graphql} from 'gatsby'
import React,{Component} from 'react'
import Wrap from '../components/Wrap'
import Layout from '../components/layout'
import Hero from '../components/Hero'
//import css from '../less/archive-blog.module.less'
import Content from '../components/Content'
import RichText from '../components/rich-text'

const PostBody = ({markdown}) => {
  const html = markdown.childMarkdownRemark.html

  return (
    <Wrap width='small'>
      <RichText html={html}/>
    </Wrap>
  )
}

class SingleBlogPost extends Component {

  render() {
    const {
      blogPost
    } = this.props.data
  
    const {
      title,
      content,
      featuredImage
    } = blogPost

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

export default SingleBlogPost

export const pageQuery = graphql`
  query blogPostBySlug($slug: String!) {
    blogPost: contentfulBlogPost(slug: {eq: $slug}) {
      title
      slug
      category {
        name
        slug
      }
      featuredImage {
        title
        sizes(maxWidth: 1920) {
          ...GatsbyContentfulSizes
        }
      }
      author {
        name
        nickname
        photo {
          sizes(maxWidth: 250) {
            ...GatsbyContentfulSizes
          }
        }
      }
      ...BlogPostContent
    }
  }
`

export const BlogContentFragment = graphql`
  fragment BlogPostContent on ContentfulBlogPost {
    content {
      childMarkdownRemark {
        excerpt
        html
      }
    }
  }
`


