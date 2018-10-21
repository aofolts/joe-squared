import React from 'react'
import PropTypes from 'prop-types'

export default class Wrap extends React.Component {

  render() {
    const {
      style
    } = this.props

    const wrapClasses = [
      `${this.props.width}Wrap`,
      this.props.className
    ].join(' ')

    return ( 
      <div className={wrapClasses} style={style || null}>
        {this.props.children}
      </div>
    )
  }
}

Wrap.propTypes = {
  width: PropTypes.string,
  style: PropTypes.object
}

Wrap.defaultProps = {
  width: 'main',
  style: {}
}