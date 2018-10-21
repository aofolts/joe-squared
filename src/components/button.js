import PropTypes from 'prop-types'
import {Link} from 'gatsby'
import {getPageRoute} from '../parts/Routes'

export default class Button extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selector: 'button button-' + props.type
    }
  }

  render() {
    return (
      <Link href={this.props.link}>
        <a className={this.props.className}>
          {this.props.label}
        </a>
      </Link>
    )
  }

}

Button.propTypes = {
  type: PropTypes.string
}

Button.defaultProps = {
  type: 'primary'
}