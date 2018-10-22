import {graphql} from 'gatsby'
import React, { Fragment } from 'react'
import Wrap from '../components/Wrap'
import { withLayout } from '../components/layout'
import Hero from '../components/hero'
import css from '../less/archive-blog.module.less'
import Content from '../components/Content'
import EventCard from '../components/card-event'
import sortercss from '../less/tabSorter.module.less'

css.sorter = sortercss

// const Nav = ({
//   activePostType,
//   setActivePostType
// }) => {
//   const postTypes = [
//     {
//       name: 'All',
//       label: 'All'
//     },
//     {
//       name: 'Event',
//       label: 'Events'
//     },
//     {
//       name: 'Default',
//       label: 'Blog'
//     }
//   ]

//   const items = postTypes.map(({name,label}) => {
//     const itemClasses = [
//       css.sorter.navItem,
//       name === activePostType ? css.sorter.selectedNavItem : null
//     ].join(' ')

//     const handleClick = () => setActivePostType(name)

//     return (
//       <li key={name} className={itemClasses} onClick={handleClick}>
//         {label}
//       </li>
//     )
//   })

//   return (
//     <nav className={[css.sorter.nav,css.nav].join(' ')}>
//       <ul>
//         {items}
//       </ul>
//     </nav>
//   )
// }

const BasicContent = ({
  layout,
  setActivePostType,
  activePostType
}) => {
  const html = layout[0].markdown.childMarkdownRemark.html

  return (
    <Wrap width='small' style={{textAlign: 'center'}}>
      <Content html={html} />
    </Wrap>
  )
}

const ArchiveSection = ({posts,activePostType}) => {
  const cards = posts.map(post => {
    const {
      id,
      postType
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

    const posts = events.edges.map(post => {
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

export default withLayout(EventsPage) 

export const pageQuery = graphql`
  {
    page: contentfulPage(slug: {eq: "events"}) {
      ...PageFields
      layout {
        ...MarkdownFragment
      }
    }
    events: allContentfulEvent(limit:9) {
      edges {
        node {
          ...EventInfo
          featuredImage {
            title
            sizes(maxWidth: 1920) {
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }
  }
`