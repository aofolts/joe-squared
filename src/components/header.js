import React from 'react'
import MainMenu from './menu-main'
import {Link} from 'gatsby'
import {HeaderContext} from './context-header'
import MobileMenu from './menu-mobile'
import css from '../less/header.module.less'
import desktopStyle from '../less/header-desktop.module.less'
import mobileStyle from '../less/header-mobile.module.less'
import logoSrc from '../../static/img/logo-inline.svg'
import {StaticQuery,graphql} from 'gatsby'

/**
 * HEADER
 */
class Header extends React.Component {

  constructor(props) {
    super(props)

    this.subMenusById = {}

    props.mainMenu.forEach(item => {
      this.addItemSubMenu(item)
    })

    this.state = {
      activeSubMenuId: false,
      isDocked: true,
      isMobile: false,
      mobileMenuIsOpen: false,
      closeMobileMenu: this.closeMobileMenu,
      openMobileMenu: this.openMobileMenu,
      setActiveSubMenuById: this.setActiveSubMenuById
    }
  }

  checkIsMobile = () => {
    const width    = window.outerWidth,
          isMobile = (width < 1280) || false

    if (isMobile !== this.state.isMobile) {
      this.setState({
        isMobile: isMobile
      })
    }
  }

  componentDidMount() {
    this.checkIsDocked()
    this.checkIsMobile()
    this.watchScroll()
    this.watchWindow()
  }

  checkIsDocked = () => {
    const docked = window.pageYOffset === 0

    if (docked !== this.state.isDocked) {
      this.setState({
        isDocked: window.pageYOffset === 0 ? true : false
      })
    }
  }

  closeMobileMenu = () => {
    this.setState({
      activeSubMenuId: false,
      mobileMenuIsOpen: false
    })
  }

  getHeaderClass = () => {
    if (this.state.isMobile) {
      return 'is-mobile'
    } else {
      return 'not-mobile'
    }
  }

  getSubMenuById = id => {
    return this.subMenusById[id]
  }

  addItemSubMenu(item) {
    if (item.subMenu) {
      this.subMenusById[item.id] = item.subMenu
    }
  }

  getMobileMenu = () => {
    const contextValue = {
      ...this.state,
      menuItems: this.props.mainMenu,
      subMenusById: this.subMenusById
    }

    if (this.state.isMobile) {
      return (
        <HeaderContext.Provider value={contextValue}>
          <MobileMenu menu={this.props.menu} closeMobileMenu={() => this.closeMobileMenu()}/>
          <div id='mobileMenuToggle' className={mobileStyle.mobileMenuToggle} onClick={this.openMobileMenu}>
            <div className={mobileStyle.topBar}></div>
            <div className={mobileStyle.middleBar}></div>
            <div className={mobileStyle.bottomBar}></div>
          </div>
        </HeaderContext.Provider>
      )
    } else {
      return (
        <HeaderContext.Provider value={contextValue}>
           <MainMenu items={this.menuItems}/>
        </HeaderContext.Provider>
      )
    }
  }

  openMobileMenu = () => {
    this.setState({
      mobileMenuIsOpen: true
    })
  }
  
  setActiveSubMenuById = id => {
    this.setState({
      activeSubMenuId: id
    })
  }

  watchScroll = () => {
    window.addEventListener('scroll',e => {
      this.checkIsDocked()
    })
  }

  watchWindow = () => {
    window.addEventListener('resize',e => {
      this.checkIsMobile()
    })
  }

  render() {
    const headerClasses = [
      css.header,
      this.state.isDocked ? null : css.scrollingHeader
    ].join(' ')

    const navClasses = [
      css.nav,
      this.state.isMobile ? mobileStyle.nav : desktopStyle.nav
    ].join(' ')

    return (
      <header id='header' className={headerClasses}>
        <nav id='nav' className={navClasses}>
          <Link to='/' id='site_name' className={css.siteName}>
            <img id='siteLogo' className={css.siteLogo} src={logoSrc} alt='Site Logo'/>
          </Link>
          {this.getMobileMenu()}
        </nav>
      </header>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      {
        contentfulOptions {
          mainMenu {
            ...MenuItemFields
            subMenu {
              ...MenuItemFields
            }
          }
        }
      }
    `}
    render={data => {
      const {
        mainMenu
      } = data.contentfulOptions

      return (
        <Header mainMenu={mainMenu}/>
      )
    }}
  />
)

export const MenuItemFields = graphql`
  fragment MenuItemFields on ContentfulMenuItem {
    id
    name
    page {
      slug
      internal {
        type
      }
    }
    externalLink
  }
`