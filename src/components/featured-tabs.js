import React from 'react'
import Content from '../components/Content'
import css from '../less/tabSorter.module.less'

const Tabs = props => {

  const tabItems = props.tabs.map(tab => {
    const itemClasses = [
            css.item,
            tab.id === props.activeTabId ? css.selectedItem : null
          ].join(' ')

    return (
      <li className={itemClasses} key={tab.id}>
        <Content html={tab.content}/>
      </li>
    )
  })

  return (
    <ul className={css.tabs}>
      {tabItems}
    </ul>
  )
}

const Nav = props => {
  const {activeTabId,setActiveTabById} = props

  const items = props.tabs.map((tab,i) => {
    const {id,title} = tab

    const itemClasses = [
      css.navItem,
      id === activeTabId ? css.selectedNavItem : null
    ].join(' ')

    return (
      <li className={itemClasses} key={id} onClick={() => setActiveTabById(id)}>
        {title}
      </li>
    )
  })

  return (
    <nav className={css.nav}>
      <ul className='items'>
        {items}
      </ul>
    </nav>
  )
}

export default class FeaturedTabs extends React.Component {

  constructor(props) { 
    super(props)

    const tabs = this.tabs = props.tabs.map(tab => {
      return {
        id: tab.id,
        title: tab.title,
        content: tab.content.reduce((html,markdown) => {
          return html + markdown.markdown.childMarkdownRemark.html
        },'')
      }
    })

    this.state = {
      activeTabId: tabs[0].id
    }
  }

  setActiveTabById = id => {
    this.setState({
      activeTabId: id
    })
  }

  render() {
    return (
      <div id='featuredTabs'>
        <Nav 
          activeTabId={this.state.activeTabId} 
          setActiveTabById={this.setActiveTabById}
          tabs={this.tabs}
        />
        <Tabs activeTabId={this.state.activeTabId} tabs={this.tabs}/>
      </div>
    )
  }

}