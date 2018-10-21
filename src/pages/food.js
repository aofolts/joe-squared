import {graphql} from 'gatsby'
import React,{Fragment} from 'react'
import Wrap from '../components/wrap'
import {withLayout} from '../components/layout'
import Hero from '../components/hero'
import css from '../less/page-food.module.less'
import Image from 'gatsby-image'
import {Link} from 'gatsby'

const BasicContent = props => {
  const html = props.layout[0].markdown.childMarkdownRemark.html

  return (
    <Wrap width='small' style={{textAlign: 'center'}}>
      <div dangerouslySetInnerHTML={{__html: html}}/>
    </Wrap>
  )
}

const CategoriesSection = props => {
  const itemCards = props.items.map(cat => {
    const {
      id,
      name,
      featuredImage,
      slug
    } = cat

    return (
      <li key={id} className={css.card}>
        <Link to={`/food/${slug}`}>
          <div className={css.cardMedia}>
            <Image 
              outerWrapperClassName='mediaBackground' 
              className={'mediaBackground'}
              sizes={featuredImage.sizes}
            />
          </div>
          <h3 className={css.cardTitle}>{name}</h3>
        </Link>
      </li>
    )
  })

  return (
    <section className={css.archiveSection}>
      <Wrap>
        <ul className={css.grid}>
          {itemCards}
        </ul>
      </Wrap>
    </section>
  )
}

class FoodPage extends React.Component {
  
  render() {
    const {
      page,
      allContentfulFoodCategory
    } = this.props.data

    const foodCategories = allContentfulFoodCategory.edges.map(cat => {
      return cat.node
    })

    const {
      title,
      layout,
      featuredImage
    } = page

    return (
      <Fragment {...this.props}>
        <Hero title={title} background={featuredImage} />
        <BasicContent layout={layout}/>
        <CategoriesSection items={foodCategories}/>
      </Fragment>
    )
  }
}

export default withLayout(FoodPage)

export const pageQuery = graphql`
  {
    page: contentfulPage(slug: {eq: "food"}) {
      ...PageFields
      layout {
        ...MarkdownFragment
      }
    }
    allContentfulFoodCategory {
      edges {
        node {
          name
          id
          slug
          description {
            childMarkdownRemark {
              html
            }
          }
          featuredImage {
            title
            sizes(maxWidth: 1920) {
              ...GatsbyContentfulSizes
            }
          }
        }
      }
    }
  }
`