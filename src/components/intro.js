import PropTypes from 'prop-types'
import Wrap from '../parts/Wrap'
import Content from '../parts/Content'

const Intro = props => { 
  return (
    <section id='section-intro'>
      <Wrap width='small'>
        <Content html={props.content} />
      </Wrap>
    </section>
  )
}

Intro.propTypes = {
  content: PropTypes.string.isRequired
}

export default Intro