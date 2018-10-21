import React from 'react'
import css from '../less/rich-text.module.less'

const RichText = props => {
  //const html = props.html.replace(/\n/g,'<br/>')

  const html = props.html

  return (
    <div 
      className={css.content} 
      dangerouslySetInnerHTML={{__html: html}}
    ></div>
  )
}

export default RichText