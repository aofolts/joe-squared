import css from '../less/slider.module.less'
import Slide from './slide'
import React from 'react'

export default class Slider extends React.Component {

  constructor(props) {
    super(props)

    const slidesById = this.props.slides.reduce((obj,slide,i) => {
      slide.index   = i
      obj[slide.id] = slide

      return obj
    },{})

    const slideCount = this.props.slides.length

    this.state = {
      slidesById: slidesById,
      slideCount: this.props.slides.length,
      previousSlide: slidesById[this.props.slides[slideCount -2].id],
      currentSlide: slidesById[this.props.slides[slideCount -1].id],
      nextSlide: slidesById[this.props.slides[0].id]
    }
  }

  advanceSlider = () => {
    const newCurrent = this.state.nextSlide

    this.setState({
      previousSlide: this.state.currentSlide,
      currentSlide: newCurrent,
      nextSlide: this.getNextSlideById(newCurrent.id)
    })
  }

  getNextSlideById = id => {
    let i = this.state.slidesById[id].index + 1

    if (i >= this.state.slideCount) {
      i = 0
    }

    return this.getSlideByIndex(i)
  }

  getPreviousSlideById = id => {
    let i = this.state.slidesById[id].index - 1

    if (i < 0) {
      i = this.state.slideCount - 1
    }

    return this.getSlideByIndex(i)
  }

  getSlideById = id => {
    return this.state.slidesById[id]
  }

  getSlideByIndex = i => {
    const id = this.props.slides[i].id
    return this.state.slidesById[id]
  }

  componentDidMount() {
    this.startLoop()
  }

  componentWillUnmount() {
    this.stopLoop()
  }
  

  getSlideElements = () => {
    return this.props.slides.map(slide => {
      const slideState = this.getSlideStateById(slide.id)

      const {
        id
      } = slide

      return (
        <Slide slide={slide} key={id} slideState={slideState} />
      )
    })
  }

  getSlideNav = () => {
    return (
      <nav className={css.nav}>
        {this.props.slides.map(slide => {
          const slideState = this.getSlideStateById(slide.id)

          const iconClasses = [
            css.navItemIcon,
            css[`${slideState}NavItemIcon`],
            slideState
          ].join(' ')

          return (
            <div key={slide.id} className={css.navItem} onClick={() => this.selectSlideById(slide.id)}>
              <div className={iconClasses}></div>
              <div className={css.navItemTitle}>{slide.title}</div>
            </div>
          )
        })}
      </nav>
    )
  }

  getSlideStateById = id => {
    switch (id) {
      case this.state.previousSlide.id: return 'previous';
      case this.state.currentSlide.id: return 'current';
      default: return 'inactive';
    }
  }

  selectSlideById = id => {
    this.stopLoop()

    this.setState({
      previousSlide: this.state.currentSlide,
      currentSlide: this.getSlideById(id),
      nextSlide: this.getNextSlideById(id)
    })
  }

  startLoop = () => {
    this.advanceSlider()

    this.timer = setInterval(() => {
      this.advanceSlider()
    },4000);
  }

  stopLoop = () => {
    clearTimeout(this.timer)
  }

  render() {
    return (
      <section id='slider' className={css.slider}>
        {this.getSlideElements()}
        {this.getSlideNav()}
      </section>
    )
  }

}

