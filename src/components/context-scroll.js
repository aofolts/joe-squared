import React from 'react'

const ScrollContext = React.createContext()

class ScrollProvider extends React.Component {

  constructor(props) {
    super(props)
  
    const boundMethods = [
      'watchScroll'
    ]
      
    boundMethods.forEach(method => this[method] = this[method].bind(this))

    this.state = {
      lastScroll: null,
      thisScroll: null,
      scrollDirection: null
    }
  }

  componentDidMount() {
    this.watchScroll()
  }

  watchScroll() {
    window.addEventListener('scroll',e => {
      const ls   = this.state.thisScroll,
            ts   = window.pageYOffset

      let dir = null

      if (ls < ts) {dir = 'down'}
      else if (ls > ts) {dir = 'up'}

      this.setState({
        lastScroll: ls,
        thisScroll: ts,
        direction: dir
      })
    })
  }

  render() {
    return (
      <ScrollContext.Provider value={this.state}>
        {this.props.children}
      </ScrollContext.Provider>
    )
  }
}

function withScroll(Component) {
  return props => (
    <ScrollContext.Consumer>
      {value => <Component {...props} scroll={value}/>}
    </ScrollContext.Consumer>
  )
}

export {
  ScrollContext,
  ScrollProvider,
  withScroll
}