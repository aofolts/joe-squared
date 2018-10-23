import React from 'react'
import css from '../less/notfound.module.less'
import gif from '../images/notfound.gif'
import {Link} from 'gatsby'

const NotFoundPage = () => (
  <div className={css.page}>
    <div className={css.container}>
      <img src={gif} alt='Jack Black looking confused' className={css.gif}/>
      <div className={css.content}>
        <h1 className={css.headline}>The page you're looking for doesn't seem to exist...</h1>
        <p>Let's start fresh, shall we?</p>
        <Link to='/' className='primaryButton'>
          Return Home
        </Link>
      </div>
    </div>
  </div>
)

export default NotFoundPage
