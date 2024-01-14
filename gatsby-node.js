const path = require("path")

// create song pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  let slugify = require("slugify")

  const result = await graphql(`
    query getSongs {
      songs: allContentfulSong {
        distinct(field: category)
        nodes {
          title
        }
      }
    }
  `)
  /*Create song page for songs*/
  result.data.songs.nodes.forEach(song => {
    createPage({
      path: `/songs/${slugify(song.title)}`,
      component: path.resolve(`src/templates/song-template.js`),
      context: {
        slug: song.title,
      },
    })
  })
  /*Create category page for songs*/
  result.data.songs.distinct.forEach(category => {
    createPage({
      path: `/categories/${slugify(category)}`,
      component: path.resolve(`src/templates/category-template.js`),
      context: {
        slug: category,
      },
    })
  })
}

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"
    // Update the page.
    createPage(page)
  }
}
