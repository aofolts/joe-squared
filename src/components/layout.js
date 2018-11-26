import React, {Component} from 'react';
import Header from './header'
import Footer from './footer'
import {Helmet} from 'react-helmet'
import PropTypes from 'prop-types'
import favicon from '../images/favicon.png'

class Layout extends Component {

  componentDidMount() {
    // Embedly
    (function(w, d){
      var id='embedly-platform', n = 'script';
      if (!d.getElementById(id)){
        w.embedly = w.embedly || function() {(w.embedly.q = w.embedly.q || []).push(arguments);};
        var e = d.createElement(n); e.id = id; e.async=1;
        e.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.embedly.com/widgets/platform.js';
        var s = d.getElementsByTagName(n)[0];
        s.parentNode.insertBefore(e, s);
      }
     })(window, document)
  }

  render() {
    const {
      seo
    } = this.props

    const {
      title,
      keywords,
      description
    } = seo

    return (
      <div id='layout'>
        <Helmet>
          <title>{title}</title>
          <meta charSet="UTF-8" />
          <meta name='description' content={description}/>
          <meta name='keywords' content={keywords.join(',')}/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <link rel='shortcut icon' type='image/png' href={favicon}/>
          <meta name="google-site-verification" content="vjgb9kiM-dGQOFXd5Dw2XgdAIjkw78Fk01kRqYwUDSs" />
        </Helmet>
        <Header menu={this.props.menu} />
          {this.props.children}
        <Footer />
      </div>
    )
  }

}

Layout.propTypes = {
  seo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.array.isRequired
  })
}

export default Layout

export function withLayout(Component) {
  return props => {
    const {
      data 
    } = props

    const {
      page
    } = data

    const {
      seo
    } = page

    const meta = {
      seo: {
        ...seo,
        description: seo.description.description
      }
    }

    if (page && page.layout) {
      page.layout = page.layout[0] || page.layout
    }

    return (
      <Layout {...meta}>
        <Component {...props}/>
      </Layout>
    )
  }
}