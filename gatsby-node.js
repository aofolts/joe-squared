const path = require('path')

const templates = {
  page: path.resolve('./src/templates/page.js'),
  home: path.resolve('./src/templates/home.js')
}

exports.createPages = ({graphql,actions}) => {
  const {createPage} = actions

  const createPages = new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulPage {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulPage.edges
        
        posts.forEach(post => {
          let slug = post.node.slug

          createPage({
            path: slug === `home` ? '/' : `/${slug}/`,
            component: templates[slug] || templates.page,
            context: {
              slug
            }
          })
        })
      })
    )
  })

  // const foodCategoryArchives = new Promise((resolve, reject) => {
  //   const foodArchiveTemplate = path.resolve('./src/templates/archive-food-category.js')

  //   resolve(
  //     graphql(
  //       `
  //         {
  //           allContentfulFoodCategory {
  //             edges {
  //               node {
  //                 slug
  //               }
  //             }
  //           }
  //         }
  //       `
  //     ).then(result => {
  //       if (result.errors) {
  //         console.log(result.errors)
  //         reject(result.errors)
  //       }

  //       const posts = result.data.allContentfulFoodCategory.edges
        
  //       posts.forEach(post => {
  //         const {slug} = post.node

  //         createPage({
  //           path: `/food/${post.node.slug}`,
  //           component: foodArchiveTemplate,
  //           context: {
  //             slug
  //           }
  //         })
  //       })
  //     })
  //   )
  // })

  // const blogPosts = new Promise((resolve, reject) => {
  //   const blogPostTemplate = path.resolve('./src/templates/single-blog.js')

  //   resolve(
  //     graphql(
  //       `
  //         {
  //           allContentfulBlogPost {
  //             edges {
  //               node {
  //                 slug
  //               }
  //             }
  //           }
  //         }
  //       `
  //     ).then(result => {
  //       if (result.errors) {
  //         console.log(result.errors)
  //         reject(result.errors)
  //       }

  //       const posts = result.data.allContentfulBlogPost.edges
        
  //       posts.forEach(post => {
  //         const {slug} = post.node

  //         createPage({
  //           path: `/community/${post.node.slug}`,
  //           component: blogPostTemplate,
  //           context: {
  //             slug
  //           }
  //         })
  //       })
  //     })
  //   )
  // })

  return Promise.all([createPages])
}