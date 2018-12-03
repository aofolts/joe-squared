import React, {Component} from 'react';
import Header from './header'
import Footer from './footer'
import {Helmet} from 'react-helmet'
import PropTypes from 'prop-types'
import favicon from '../images/favicon.png'
import {getPageUrl} from './link'

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
      data
    } = this.props

    const {
      page
    } = data

    return (
      <div id='layout'>
        <Helmet>
          <title>{page.title}</title>
          <meta charSet="UTF-8" />
          <meta name='description' content={page.description}/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <link rel='shortcut icon' type='image/png' href={favicon}/>
          <meta property="og:title" content={page.title}></meta>
          <meta property="og:description" content={page.description}/>
          <meta property="og:image" content={page.featuredImage.fluid.src}/>
          <meta property="og:url" content={getPageUrl(page)}/>
        </Helmet>
        <Header menu={this.props.menu} />
          {this.props.children}
        <Footer />
      </div>
    )
  }
}

Layout.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.shape({
      featuredImage: PropTypes.shape({
        fluid: PropTypes.shape({
          srcSet: PropTypes.string.isRequired
        })
      }),
      seo: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
      })
    })
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

    const dataForLayout = {
      page: {
        ...data.page,
        seo: {
          ...data.page.seo,
          description: data.page.seo.description.description
        }
      }
    }

    // Patch for Contentful + GraphQL single reference field 
    // with multiple types issue: #10090
    if (page && page.layout) {
      data.page.layout = page.layout[0] || page.layout
    }

    return (
      <Layout data={dataForLayout}>
        <Component {...props}/>
      </Layout>
    )
  }
}