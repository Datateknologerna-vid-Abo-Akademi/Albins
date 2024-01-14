/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Albins songs",
    titleTemplate: "%s · Skål!",
    description: "Albin feels like singing",
    url: "https://albins.netlify.app", // No trailing slash allowed!
    image: "/images/newalbin.png", // Path to your image you placed in the 'static' folder
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Albins`,
        short_name: `Albins`,
        start_url: `/`,
        background_color: `#253237`,
        theme_color: `#253237`,
        display: `standalone`,
        icon: `src/images/newalbin.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/categories/*`, `/songs/*`],
      },
    },
    {
      resolve: "gatsby-plugin-lunr",
      options: {
        languages: [{ name: "en" }],
        fields: [
          { name: "title", store: true, attributes: { boost: 20 } },
          { name: "category", store: true, attributes: { boost: 5 } },
          { name: "melody", store: true, attributes: { boost: 10 } },
          { name: "url", store: true },
        ],
        resolvers: {
          ContentfulSong: {
            title: node => node.title,
            category: node => node.category,
            melody: node => node.melody,
            url: node => node.title,
          },
        },
        filename: "search_index.json",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `rp9t6yaptcjc`,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
  ],
}
