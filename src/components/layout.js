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

    const description = seo.description.description

    return (
      <div id='layout'>
        <Helmet>
          <title>{seo.title}</title>
          <meta charSet="utf-8" />
          <meta name='description' content={description}/>
          <link rel='shortcut icon' type='image/png' href={favicon}/>
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
    description: PropTypes.string.isRequired
  })
}

export default Layout

export function withLayout(Component) {
  return props => {
    const {
      data
    } = props

    const {
      seo
    } = data.page

    const meta = {
      seo: {
        ...seo,
        description: seo.description.description
      }
    }

    return (
      <Layout {...meta}>
        <Component {...props}/>
      </Layout>
    )
  }
}