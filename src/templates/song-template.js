import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import * as styles from "../components/css/songs.module.css"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"

const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    [BLOCKS.EMBEDDED_ASSET]: node => {
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
            <code>{JSON.stringify(node, null, 2)}</code>
          </pre>
        </>
      )
    },
  },
}

const ComponentName = ({ data }) => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.songWrapper}>
          <h2>{data.song.title}</h2>
          <h3>
            <i>Mel: {data.song.melody}</i>
          </h3>
          <div className={styles.songtext}>
            {renderRichText(data.song.content, options)}
          </div>
          {data.song.author != null && (
            <p>
              <i>Text: {data.song.author}</i>
            </p>
          )}
          {data.song.audioUrl != null && (
            <audio controls src={data.song.audioUrl}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          )}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query GetSingleSong($slug: String) {
    song: contentfulSong(title: { eq: $slug }) {
      author
      title
      melody
      category
      audioUrl
      content {
        raw
      }
    }
  }
`

export default ComponentName
