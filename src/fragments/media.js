import {graphql} from 'gatsby'
 
export const assetMetaFragment = graphql`
  fragment assetMeta on ContentfulAsset {
    title
    alt: description
  }
`
 
export const fluidImageSizesFragment = graphql`
  fragment fluidImageSizes on ContentfulFluid {
    base64
    aspectRatio
    srcSet
    srcSetWebp
    sizes
    src
    srcWebp
  }
`
 
export const cardImageFragment = graphql`
  fragment cardImage on ContentfulAsset {
    ...assetMeta
    fluid(maxWidth: 400) {
      ...GatsbyContentfulFluid
    }
  }
`
 
export const smallFixedImageFragment = graphql`
  fragment smallFixedImage on ContentfulAsset {
    ...assetMeta
    fixed(width: 250) {
      ...GatsbyContentfulFixed
    }
  }
`
 
export const smallFluidImageFragment = graphql`
  fragment smallFluidImage on ContentfulAsset {
    ...assetMeta
    fluid(maxWidth: 250) {
      ...GatsbyContentfulFluid
    }
  }
`
 
export const imageHeroFragment = graphql`
  fragment imageHero on ContentfulAsset {
    ...assetMeta
    fluid(maxWidth: 1920) {
      ...GatsbyContentfulFluid
    }
  }
`