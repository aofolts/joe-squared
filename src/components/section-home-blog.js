import React,{Component} from 'react'
import BlogCard from './card-blog'
import EventCard from './card-event'
import Wrap from './wrap'
import css from '../less/section-home-blog.module.less'
import sortercss from '../less/tabSorter.module.less'

css.sorter = sortercss

const Nav = ({
  activePostType,
  setActivePostType
}) => {
  const postTypes = [
    {
      name: 'Event',
      label: 'Events'
    },
    {
      name: 'Default',
      label: 'Blog'
    }
  ]

  const items = postTypes.map(({name,label}) => {
    const itemClasses = [
      css.sorter.navItem,
      name === activePostType ? css.sorter.selectedNavItem : null
    ].join(' ')

    const handleClick = () => setActivePostType(name)

    return (
      <li key={name} className={itemClasses} onClick={handleClick}>
        {label}
      </li>
    )
  })

  return (
    <nav className={[css.sorter.nav,css.nav].join(' ')}>
      <ul>
        {items}
      </ul>
    </nav>
  )
}

export default class BlogSection extends Component {

  constructor(props) {
    super(props)

    const {events,blogPosts} = props
  
    this.state = {
      activePosts: events || blogPosts,
      activePostType: events ? 'Event' : 'Default'
    }
  }

  setActivePostType = name => {
    const {
      events,
      blogPosts
    } = this.props

    this.setState({
      activePostType: name,
      activePosts: name === 'Event' ? events : blogPosts
    })
  }

  render() {
    const {
      activePosts,
      activePostType
    } = this.state

    const {
      setActivePostType
    } = this

    console.log(activePostType)

    const cards = activePosts.map(post => (
      activePostType === 'Event'
        ? <EventCard key={post.id} post={post}/>
        : <BlogCard key={post.id} post={post}/>
    ))

    const navArgs = {
      activePostType,
      setActivePostType
    }

    return (
      <section id='communitySection' className={css.section}>
        <Wrap>
          <h2 className={css.headline}>Our Community</h2>
          <Nav {...navArgs}/>
          <div className={[css.grid,'thirdsGrid'].join(' ')}>
            {cards}
          </div>
        </Wrap>
      </section>
    )
  }
}