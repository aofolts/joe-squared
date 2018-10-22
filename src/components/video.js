import React from 'react'
import PropTypes from 'prop-types'

export default class Video extends React.Component {

  constructor(props) {
    super(props)

    const {videoUrl: url} = props

    this.video = {
      key: url.match(/[^/]+$/)[0] ,
      host: url.indexOf('youtube') > -1 ? 'youtube' : 'vimeo' 
    }

    this.state = {
      src: null
    }
  }

  getSrc = () => {
    const {key,host} = this.video

    switch (host) {
      case 'youtube': return `https://www.youtube.com/embed/${key}`;
      case 'vimeo':   return `https://player.vimeo.com/video/${key}?title=0&byline=0&portrait=0`;
      default: return false;
    }
  }

  loadSrc = () => {
    this.setState({
      src: this.getSrc()
    })
  }

  render() {
    const iframe = (
      <iframe className={this.props.className || 'video'}
        src={this.getSrc()}
        frameBorder="0"
        allowFullScreen
        // TODO: accept title argument
        title='Video'
      />
    )

    return iframe
  }

}

Video.propTypes = {
  videoUrl: PropTypes.string.isRequired
}