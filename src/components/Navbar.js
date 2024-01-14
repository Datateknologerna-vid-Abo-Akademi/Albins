import React from "react"
import { Link } from "gatsby"
import * as styles from "./css/navbar.module.css"

const navbar = () => {
  const url = typeof window !== "undefined" ? window.location.href : ""
  return (
    <nav className={styles.navbar}>
      <div className={styles.navlist}>
        {url.endsWith("/categories") ? (
          <Link className={styles.currentNav} to="/categories">
            Home
          </Link>
        ) : (
          <Link className={styles.navLinkColor} to="/categories">
            Home
          </Link>
        )}
        {url.includes("/search") ? (
          <Link className={styles.currentNav} to="/search">
            Search
          </Link>
        ) : (
          <Link className={styles.navLinkColor} to="/search">
            Search
          </Link>
        )}
      </div>
    </nav>
  )
}

export default navbar
