import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import SearchForm from "../components/searchForm"
import SearchResults from "../components/searchResults"

const Search = ({ location }) => {
  /*https://assortment.io/posts/gatsby-site-search-lunr-js*/
  const [results, setResults] = useState([])
  const searchQuery = new URLSearchParams(location.search).get("keywords") || ""

  useEffect(() => {
    if (window.__LUNR__) {
      window.__LUNR__.__loaded.then(lunr => {
        const refs = lunr.en.index.search(searchQuery + "*")
        const posts = refs.map(({ ref }) => lunr.en.store[ref])
        setResults(posts)
      })
    }
  }, [location.search])

  return (
    <Layout>
      <SearchForm query={searchQuery} />
      <SearchResults query={searchQuery} results={results} />
    </Layout>
  )
}

export default Search
