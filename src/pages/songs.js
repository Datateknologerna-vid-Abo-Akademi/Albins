import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import * as styles from "../components/css/songs.module.css"
import { Link } from "gatsby"

const ComponentName = ({ data }) => {
  const {
    allContentfulSong: { nodes: songs },
  } = data
  let slugify = require("slugify")

  return (
    <Layout>
      <section className={styles.container}>
        <h1>Songs</h1>
        <div className={styles.containerWrapper}>
          {songs.map(song => {
            return (
              <article key={song.id}>
                <Link to={`/songs/${slugify(song.title)}`}>
                  <div className={styles.link}>
                    <h2>{song.title}</h2>
                    <h3>
                      <i>{song.melody}</i>
                    </h3>
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
    allContentfulSong(sort: { order: ASC, fields: [order, category] }) {
      nodes {
        id
        author
        category
        title
        melody
      }
    }
  }
`

export default ComponentName
