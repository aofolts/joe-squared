import React from 'react'
import {Link} from 'gatsby'
import {withHeaderContext} from '../parts/HeaderContext'
import css from '../less/header.less'
import desktopStyle from '../less/header-desktop.less'
import mobileStyle from '../less/header-mobile.less'

class MenuItem extends React.Component {

  constructor(props) {
    super(props)

    const boundMethods = [
      'getItemClass',
      'getSubMenuToggle',
    ]
    
    boundMethods.forEach(method => this[method] = this[method].bind(this))

    this.item = props.item;
    this.subMenu = props.item.sub_menu || []
  }

  componentDidMount(props) {
    this.setState({
      subMenuIsOpen: props.subMenuIsOpen,
      activeSubMenuId: props.activeSubMenuId
    })
  }

  getItemClass() {
    const classes = [
      'item',
      'item-primary'
    ]

    return classes.join(' ')
  }

  getSubMenu() {
    if (this.subMenu) {
      const {isMobile,activeSubMenuId} = this.props.headerContext

      const items = this.subMenu.map(item => {
        const slug    = config.getPostSlug(item.url),
              target  = (item.type == 'custom') ? '_blank' : null

        const href = {
          pathname: slug,
          query: {
            slug: slug,
            apiRoute: 'pages'
          }
        }

        const itemClasses = [
          css.secondaryItem,
          isMobile ? mobileStyle.secondaryItem : desktopStyle.secondaryItem
        ].join(' ')
        
        return (
          <li className={itemClasses} key={item.ID} id={item.ID}>
            <Link href={href} as={slug}>
              <a className='title-secondary' target={target}>
                {item.title}
              </a>
            </Link>
          </li>
        )
      })

      const subMenuClasses = [
        css.subMenu,
        isMobile && (activeSubMenuId === this.item.ID) ? mobileStyle.activeSubMenu : null,
        isMobile ? mobileStyle.subMenu : desktopStyle.subMenu
      ].join(' ')
  
      return (
        <ul className={subMenuClasses}>
          {items} 
        </ul>
      )
    }
    
    return null
  }

  getSubMenuToggle() {
    const {isMobile} = this.props.headerContext

    if (this.subMenu.length > 0 && isMobile) {
      const toggleClasses = [
        this.props.headerContext.isMobile ? mobileStyle.subMenuToggle : null
      ].join(' ')

      return (
        <div 
          className={toggleClasses}
          onClick={() => this.props.headerContext.setActiveSubMenuById(this.item.ID)}
          >
        </div>
      )
    } 
    
    return null
  }

  render() {
    const item = this.props.item 
    const subMenuClass = (this.subMenu.length > 0) ? 'has-children' : null,
          slug         = item.url ? config.getPostSlug(item.url) : null,
          target       = (item.type == 'custom') ? '_blank' : null

    const {isMobile} = this.props.headerContext

    const itemClasses = [
      css.primaryItem,
      isMobile ? mobileStyle.primaryItem : desktopStyle.primaryItem
    ].join(' ')

    const titleClasses = [
      isMobile ? mobileStyle.primaryTitle : null,
      (this.subMenu.length > 0 && !isMobile) ? desktopStyle.subMenuIcon : null
    ].join(' ')

    const link = slug 
      ? (
        <Link href={`/${slug}/?slug=${slug}&apiRoute=pages`} as={slug}>
          <a className='link' target={target}>
            {item.title}
          </a>
        </Link>
      ) 
      : (
        <a className='link'>
          {item.title}
        </a>
      )


    return (
      <li className={itemClasses} >
        <div className={titleClasses}>
          {link}
          {this.getSubMenuToggle()}
        </div>
        {this.getSubMenu()}
      </li>
    )
  }

}

export default withHeaderContext(MenuItem)