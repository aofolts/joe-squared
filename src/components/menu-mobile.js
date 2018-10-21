import React from 'react'
import MobileMainMenu from './menu-main-mobile'
import {withHeaderContext} from './context-header'
import css from '../less/header-mobile.module.less'

const MobileMenuExit = withHeaderContext(props => {
  const {activeSubMenuId,setActiveSubMenuById,closeMobileMenu} = props.headerContext

  const exitClasses = [
    css.exit,
    activeSubMenuId ? css.exitSubMenu : css.exitMobileMenu
  ].join(' ')

  return (
    <div 
      className={exitClasses} 
      onClick={() => {
        if (activeSubMenuId) {
          setActiveSubMenuById(false)
        } else {
          closeMobileMenu()
        }
      }}
      >
    </div>
  )
})

class MobileMenu extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      openClass: props.openClass
    }
  }
  
  render() {
    const {headerContext} = this.props

    const classes = [
      headerContext.mobileMenuIsOpen ? css.openMobileMenu : null,
      css.menuMobile
    ].join(' ')

    return (
      <div id='menuMobile' className={classes}>
        <MobileMainMenu/>
        <MobileMenuExit/>
      </div>
    )
  }
}

export default withHeaderContext(MobileMenu)