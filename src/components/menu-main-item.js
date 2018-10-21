import React from 'react'
import css from '../less/menu-main-mobile.module.less'
import {withHeaderContext} from './context-header'
import Link from './link'

const MenuItem = props => {
  const {
    id,
    name,
    page,
    externalLink,
    subMenu
  } = props

  const {
    setActiveSubMenuById
  } = props.headerContext

  const url = page ? page.slug : externalLink

  const SubMenuToggle = () => {
    if (!subMenu) return null

    const handleClick = () => {
      setActiveSubMenuById(id)
    }

    return (
      <div className={css.subMenuToggle} onClick={handleClick}/>
    )
  }
  
  const itemTitle = (
    <Link
      className={css.menuItem}
      {...{page,url}}
    >
      {name}
    </Link>
  )

  return (
    <li key={id} className={css.menuItem}>
      {itemTitle}
      <SubMenuToggle/>
    </li>
  )
}

export default withHeaderContext(MenuItem)