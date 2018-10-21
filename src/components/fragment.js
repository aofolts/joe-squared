import {graphql} from 'gatsby'

export const markdownContent = graphql`
  fragment MarkdownFragment on ContentfulMarkdown {
    markdown {
      childMarkdownRemark {
        html
      }
    }
  }
`