import React from "react"
import { Link } from "gatsby"
import * as styles from "./css/search.module.css"

const SearchResults = ({ query, results }) => {
  let slugify = require("slugify")
  return (
    <section
      className={styles.container}
      aria-label="Search results for all songs"
    >
      {!!results.length && query && (
        <h2 id="search-results-count" aria-live="assertive">
          Found {results.length} songs on "{query}"
        </h2>
      )}
      {!!results.length && (
        <ol className={styles.searchResultsList}>
          {results.map(({ title, url, category, melody }) => (
            <li key={title}>
              <Link to={`/songs/${slugify(url)}`}>
                <div className={styles.link}>
                  <h3>{title}</h3>
                  <h5 style={{ fontWeight: 100 }}>
                    Mel: {melody}
                    <br />
                    Category: {category}
                  </h5>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}

export default SearchResults
