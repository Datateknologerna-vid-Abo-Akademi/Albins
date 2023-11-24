import React, { useState } from "react"
import { navigate } from "gatsby"

const SearchForm = () => {
  const [inputValue, setInputValue] = useState("")
  const [timer, setTimer] = useState(null)

  const inputChanged = e => {
    setInputValue(e.target.value)

    clearTimeout(timer)

    const newTimer = setTimeout(() => {
      navigate(`/search?keywords=${encodeURIComponent(e.target.value)}`)
    }, 200)

    setTimer(newTimer)
  }

  return (
    <form role="search" method="GET">
      <input
        type="search"
        placeholder="Search..."
        autoComplete="off"
        id="search-input"
        name="keywords"
        onChange={inputChanged}
        value={inputValue}
      />
    </form>
  )
}

export default SearchForm
