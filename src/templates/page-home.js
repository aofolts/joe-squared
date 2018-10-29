import React, {Fragment} from 'react'
import {graphql,Link} from 'gatsby'
import {withLayout} from '../components/layout'
import Slider from '../components/slider'
import Wrap from '../components/wrap'
import Section from '../components/section'
import FeaturedTabs from '../components/featured-tabs'
import Video from '../components/video'
import css from '../less/home.module.less'
import BlogSection from '../components/section-home-blog'
 
const IntroSection = ({
  markdown,
  tabs
}) => {
  return (
    <Section name='intro' className={css.introSection}>
      <Wrap width='small'>
        <div dangerouslySetInnerHTML={{__html: markdown.childMarkdownRemark.html}}/>
        <FeaturedTabs tabs={tabs} />
      </Wrap>
    </Section>
  )
}
  
const VideoSection = props => (
  <Section name='video' className={css.videoSection}>
    <Wrap width='medium'>
      <article className={css.videoContainer}>
        <Video videoUrl={props.videoUrl} className={[css.video,'mediaBackground'].join(' ')}/>
      </article>
    </Wrap>
  </Section>
)

const MenusSection = props => {
  const {headline,copy,menus} = props

  const menuItems = menus.map(menu => {
    const {id,title,slug} = menu

    return (
      <li className={css.menuCard} key={id}>
        <Link to={slug} className={css.menuCardContent}>
          {title}
        </Link>
      </li>
    )
  })

  const menusList = (
    <ul className={[css.menusList,'thirdsGrid'].join(' ')}>
      {menuItems}
    </ul>
  )

  return (
    <Section name='menus' className={css.menusSection}>
      <div className={css.menusContent}>
        <Wrap width='small'>
          <h2>{headline}</h2>
          <div className={css.menusCopy} dangerouslySetInnerHTML={{__html: copy.markdown.childMarkdownRemark.html}}/>
        </Wrap>
        <Wrap width='medium' className={css.menusContainer}>
          {menusList}
        </Wrap>
      </div>
    </Section>
  )
}

const HomePage = ({ data }) => {
  const {
    page,
    blogPostsData,
    eventsData
  } = data

  const blogPosts = blogPostsData.edges.map(item => item.node)
  const events = eventsData.edges.map(item => item.node)

  const {
    layout
  } = page
  
  const {
    featuredMenus,
    intro,
    menusCopy,
    quickLinks,
    video,
    heroSlider: heroSlides
  } = layout[0]

  return (
    <Fragment>     
      <Slider slides={heroSlides}/>
      <IntroSection {...intro} tabs={quickLinks}/>         
      <VideoSection {...video}/>
      <MenusSection copy={menusCopy} menus={featuredMenus}/>
      <BlogSection {...{blogPosts,events}}/>
    </Fragment>
  )
}

export default withLayout(HomePage)

export const query = graphql`
  query {
    page: contentfulPage(slug: {eq: "home"}) {
      ...PageFields
      layout {
        ...homePageFields
      }
    }
    eventsData: allContentfulEvent(
      limit: 3
      sort: { 
        fields: [eventDate] 
        order: DESC 
      }
    ) {
      edges {
        node {
          ...EventCard
        }
      }
    }
    blogPostsData: allContentfulBlogPost(
      limit: 3
      sort: { 
        fields: [publishDate]
        order: DESC 
      }
    ) {
      edges {
        node {
          ...BlogPostCardFragment
        }
      }
    }
  }
`

export const homePageFields = graphql`
  fragment homePageFields on ContentfulLayoutHomePage {
    intro {
      markdown {
        childMarkdownRemark {
          html
        }
      }
    }
    quickLinks {
      id
      title
      content {
        markdown {
          childMarkdownRemark {
            html
          }
        }
      }
    }
    video {
      videoUrl
    }
    menusCopy {
      markdown {
        childMarkdownRemark {
          html
        }
      }
    }
    featuredMenus {
      id
      title
      slug
      featuredImage {
        title
        sizes {
          srcSet
        }
      }
    }
    heroSlider {
      id
      name
      headline 
      buttons {
        name
        label
        link
      }
      image {
        title
        sizes(maxWidth: 1920) {
          ...GatsbyContentfulSizes
        }
      }
    }
  }
`

