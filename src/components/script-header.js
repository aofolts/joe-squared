
export default class HeaderScript {

  constructor() {
    this.$header    = document.querySelector('#header')
    this.$nav       = document.querySelector('#nav') 
    this.lastScroll = 0,
    this.scrollDir  = null

    this.logScroll   = this.logScroll.bind(this)
    this.watchHeader = this.watchHeader.bind(this)

    this.watchScroll()
    this.watchHeader()
  }

  watchScroll() {
    window.addEventListener('scroll',() => {
      this.logScroll()
      this.watchHeader()
    })
  }

  logScroll() {
    const st = window.pageYOffset
    if (st > this.lastScroll) {
      this.scrollDir = 'down'
    } else {
      this.scrollDir = 'up'
    }
    this.lastScroll = st
  }

  watchHeader() {
    const y            = window.pageYOffset,
          headerHeight = this.$header.offsetHeight

    // Dock the header
    if (y <= headerHeight) {
      this.$header.classList.remove('is-scrolling')
      this.$header.style.top = -y + 'px'
    } else {
      this.$header.classList.add('is-scrolling')
    }

    // Switch to compact nav layout
    if (y > headerHeight) {
      this.$header.classList.add('is-compact')
    } else {
      this.$header.classList.remove('is-compact')
    }

    // Put the header up (scrolling up)
    if (y < 500 && y > headerHeight + 100 && this.scrollDir == 'up') {
      this.putHeaderUp()
    } 

    // Put the header down (scrolling up)
    if (y > 500 && this.scrollDir == 'up') {
      this.putHeaderDown()
    }
  }

  // Slides header into view
  putHeaderDown() {
    this.$header.style.top = (-this.$header.offsetHeight + this.$nav.offsetHeight) + 'px'
  }

  // Slides header out of view
  putHeaderUp(){
    this.$header.style.top = -this.$header.offsetHeight + 'px'
  }

}