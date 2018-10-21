import React from 'react'

const Content = props => {
  const html = props.html.replace(/\n/g,'<br/>')

  return (
    <div className='content' dangerouslySetInnerHTML={{__html: html}}></div>
  )
}

export default Content