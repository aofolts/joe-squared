import {graphql} from 'gatsby'
import React, { Fragment } from 'react'
import Wrap from '../components/wrap'
import { withLayout } from '../components/layout'
import Hero from '../components/hero'
import css from '../less/archive-blog.module.less'
import Content from '../components/Content'
import EventCard from '../components/card-event'

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

const ArchiveSection = ({
  entries
}) => {
  const cards = entries.map(post => {
    const {
      id
    } = post

    const wrapClasses = [
      css.cardWrap
    ].join(' ')

    return (
      <div key={id} className={wrapClasses}>
        <EventCard post={post}/>
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

class EventsPage extends React.Component {
  
  render() {
    const {
      page,
      events
    } = this.props.data

    const entries = events.edges.map(post => {
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
        <ArchiveSection {...{entries}}/>
      </Fragment>
    )
  }
}

export default withLayout(EventsPage)

export const pageQuery = graphql`
  {
    page: contentfulPage(slug: {eq: "events"}) {
      ...PageFields
      layout {
        ...MarkdownFragment
      }
    }
    events: allEventbriteEvents(
      limit: 18,
      filter: {
        status: {eq: "live"}
      }
      sort: {
        order: ASC,
        fields: [start___local]
      }
    ) {
      edges {
        node {
          ...EventInfo
        }
      }
    }
  }
`