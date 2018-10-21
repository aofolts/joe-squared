import React from 'react'
import PropTypes from 'prop-types'

export default class Section extends React.Component {

  constructor(props) {
    super(props) 

    this.state = {
      id: `${props.name}Section`
    }
  }

  render() {
    return ( 
      <section id={this.state.id} className={this.props.className}>
        {this.props.children}
      </section>
    )
  }

}

Section.propTypes = {
  name: PropTypes.string.isRequired
}

Section.defaultProps = {

}