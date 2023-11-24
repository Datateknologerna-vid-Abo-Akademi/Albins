import React from "react"
import Layout from "../components/Layout"
import * as styles from "../components/css/categories.module.css"
import { Link, graphql } from "gatsby"

const ComponentName = ({ data }) => {
  const {
    allContentfulSong: { nodes: songs },
  } = data
  let slugify = require("slugify")

  /*Get unique categories*/
  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

  const uniqueCategories = getUniqueListBy(songs, "category")

  return (
    <Layout>
      <section className={styles.container}>
        <h1>Categories</h1>
        <div className={styles.containerWrapper}>
          {uniqueCategories.map(song => {
            return (
              <article key={song.id}>
                <Link to={`/categories/${slugify(song.category)}`}>
                  <div className={styles.link}>
                    <h4>{song.category}</h4>
                  </div>
                </Link>
              </article>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  {
    allContentfulSong(sort: { order: ASC, fields: [categoryOrder] }) {
      nodes {
        id
        category
      }
    }
  }
`

export default ComponentName
