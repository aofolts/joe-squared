import React from 'react'
import {withHeaderContext} from './context-header'
import Link from './link'
import css from '../less/menu-main-desktop.module.less'
import mobileStyle from '../less/header-mobile.module.less'

const SubMenu = ({subMenu}) => {
  if (!subMenu) return null

  const items = subMenu.map(item => {
    const {
      id,
      name,
      page,
      externalLink
    } = item

    const itemTitle = (
      <Link
        className={css.secondaryItemTitle}
        page={page}
        url={externalLink}
      >
        {name}
      </Link>
    )

    return (
      <div key={id} className={css.secondaryItem}>
        {itemTitle}
      </div>
    )
  })

  return (
    <ul className={css.subMenu}>
      {items}
    </ul>
  )
}

class MainMenu extends React.Component {

  getMenuItems = () => {
    const {
      menuItems
    } = this.props.headerContext
    
    return menuItems.map(item => {
      const {
        id,
        name,
        page,
        externalLink,
        subMenu
      } = item
      
      const itemTitle = (
        <Link
          className={css.primaryItemTitle}
          page={page}
          url={externalLink}
        >
          {name}
        </Link>
      )

      return (
        <div key={id} className={css.primaryItem}>
          {itemTitle}
          <SubMenu subMenu={subMenu}/>
        </div>
      )
    })
  }

  render() {
    const {isMobile,activeSubMenuId} = this.props.headerContext

    const classes = [
      css.menu,
      isMobile ? mobileStyle.menu : null,
      isMobile && activeSubMenuId ? mobileStyle.menuShowingSubMenu : null
    ].join(' ')

    return (
      <ul id='menu' className={classes}>
        {this.getMenuItems()}
      </ul>
    )
  }
}

export default withHeaderContext(MainMenu)