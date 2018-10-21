import React,{Component} from 'react'
import css from '../less/menu-main-mobile.module.less'
import {withHeaderContext} from './context-header'
import MenuItem from './menu-main-item'

class MobileMainMenu extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      activeSubMenu: false
    }
  }

  render() {
    const {
      menuItems,
      subMenusById,
      activeSubMenuId
    } = this.props.headerContext

    const primaryItems = menuItems.map(item => {
      return <MenuItem key={item.id} {...item}/>
    })

    const PrimaryMenu = () => {
      const primaryMenuClasses = [
        css.primaryMenu,
        activeSubMenuId ? css.inactivePrimaryMenu : null
      ].join(' ')

      return (
        <div className={primaryMenuClasses}>
          {primaryItems}
        </div>
      )
    }

    const subMenus = Object.keys(subMenusById).reduce((arr,key) => {
      const items = subMenusById[key].map(item => {
        return <MenuItem key={item.id} {...item}/>
      })

      const subMenuClasses = [
        css.subMenu,
        activeSubMenuId === key ? css.activeSubMenu : null
      ].join(' ')

      arr.push((
        <div key={key} className={subMenuClasses}>
          {items}
        </div>
      ))

      return arr
    },[])

    return (
      <div className={css.container}>
        <ul className={css.mainMenu}>
          <PrimaryMenu/>
          {subMenus}
        </ul>
      </div>
    )
  }
}

export default withHeaderContext(MobileMainMenu)