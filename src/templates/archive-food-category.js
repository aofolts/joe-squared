import {graphql} from 'gatsby'
import React from 'react'
import Wrap from '../components/Wrap'
import Layout from '../components/layout'
import Hero from '../components/Hero'
import css from '../less/archive-foodCategory.module.less'
import {Link} from 'gatsby'
import Section from '../components/Section'

const Intro = props => {
  const {
    category,
    subCategories,
    activeSubCategory,
    setActiveSubCategoryById
  } = props

  const {
    name,
    description
  } = category

  const categoryDescription = description
    ? (
      <div 
        className={css.categoryDescription}
        dangerouslySetInnerHTML={{__html: description.childMarkdownRemark.html}}
      />
    ) : null

  const subCategoryDescription = activeSubCategory.description
    ? (
      <div 
        className={css.subCategoryDescription}
        dangerouslySetInnerHTML={{__html: activeSubCategory.description.childMarkdownRemark.html}}
      />
    ) : null

  return (
    <Wrap className={css.intro} width='small'>
      {categoryDescription}
      <p><Link to='/food'>Food</Link> > {name}</p>
      {subCategoryDescription}
      <SubCategoriesNav   
        items={subCategories} 
        activeSubCategory={activeSubCategory}
        setActiveSubCategoryById={setActiveSubCategoryById}
      />
    </Wrap>
  )
}

const SubCategoriesNav = props => {
  const {
    activeSubCategory,
    setActiveSubCategoryById,
    items
  } = props

  const menuItems = items.map(item => {
    const {name,id} = item

    const itemClasses = [
      css.navItem,
      id === activeSubCategory.id ? css.activeNavItem : null
    ].join(' ')

    const handleClick = () => {
      setActiveSubCategoryById(id)
    }

    return (
      <li className={itemClasses} key={id} onClick={handleClick}>
        {name}
      </li>
    )
  })

  return (
    <ul className={css.menu}>
      {menuItems}
    </ul>
  )
}

const MenuItemsSection = props => {
  const {
    items,
    activeSubCategory
  } = props

  const itemsList = items.map(item => {
    const {
      name,
      id,
      pricing,
      subCategory,
      description
    } = item

    const itemClasses = [
      css.foodItem,
      activeSubCategory.id === subCategory.id ? css.activeFoodItem : null
    ].join(' ')

    const descriptionElement = description
      ? (
        <div 
          className={css.foodItemDescription}
          dangerouslySetInnerHTML={{__html: description.childMarkdownRemark.html}}  
        />
      )
      : null

    const PricingElement = () => {
      if (pricing[0] !== "0") {
        const priceList = pricing.map(price => '$' + price)

        return (
          <div className={css.pricing}>
            {priceList.join(', ')}
          </div>
        )
      }

      return null
    }

    return (
      <li key={id} className={itemClasses}>
        <h3>{name}</h3>
        {descriptionElement}
        <PricingElement/>
      </li>
    )
  })

  return (
    <Section className={css.foodItemsSection} name='foodItems'>
      <Wrap>
        <ul className={css.grid}>
          {itemsList}
        </ul>
      </Wrap>
    </Section>
  )
}

class FoodCategoryTemplate extends React.Component {

  constructor(props) {
    super(props)

    const {
      allContentfulFoodSubCategory: subCategoryEdges
    } = this.props.data

    const subCategories = this.subCategories = subCategoryEdges.edges.map(item => {
      return item.node
    })

    this.state = {
      activeSubCategory: subCategories[0]
    }
  }
  
  setActiveSubCategoryById = id => {
    this.setState({
      activeSubCategory: this.subCategories.find(cat => cat.id === id)
    })
  }
  
  render() {
    const {
      activeSubCategory
    } = this.state

    const {
      contentfulFoodCategory: category,
      allContentfulFoodItem: itemEdges,
      allContentfulFoodSubCategory: subCategoryEdges
    } = this.props.data

    const {
      name,
      featuredImage
    } = category

    const subCategories = subCategoryEdges.edges.map(item => {
      return item.node
    })

    const foodItems = itemEdges.edges.map(item => {
      return item.node
    })

    const seo = {
      description: category.description 
    }

    return (
      <Layout title={category.name} seo={seo}>
        <Hero title={name} background={featuredImage} />
        <Intro 
          category={category} 
          subCategories={subCategories}
          activeSubCategory={activeSubCategory}
          setActiveSubCategoryById={this.setActiveSubCategoryById}
        />
        <MenuItemsSection 
          items={foodItems}
          activeSubCategory={activeSubCategory}
        />
      </Layout>
    )
  }
}

export default FoodCategoryTemplate

export const pageQuery = graphql`
  query foodCategoryQuery($slug: String!) {
    contentfulFoodCategory(slug: { eq: $slug }) {
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
    allContentfulFoodItem(
      filter: {category: {slug: {eq: $slug}}}
      sort: {fields: [name]}
    ) {
      edges {
        node {
          name
          id
          subCategory {
            id
          }
          pricing
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
    allContentfulFoodSubCategory(
      filter: {category: {slug: {eq: $slug}}}
      sort: {fields: [name]}
    ) {
      edges {
        node {
          name
          id
          category {
            id
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`