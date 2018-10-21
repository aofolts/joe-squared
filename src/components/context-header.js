import React from 'react'

const HeaderContext = React.createContext({
  isDocked: true,
  isMobile: null,
  activeSubMenuId: false,
  menuItems: [],
  closeMobileMenu: () => {},
  openMobileMenu: () => {},
  getActiveSubMenuId: () => {},
  setActiveSubMenuId: () => {}
})

function withHeaderContext(Component) {
  return props => (
    <HeaderContext.Consumer>
      {headerContext => (
        <Component {...props} headerContext={headerContext}/>
      )}
    </HeaderContext.Consumer>
  )
}

export {
  HeaderContext,
  withHeaderContext
}