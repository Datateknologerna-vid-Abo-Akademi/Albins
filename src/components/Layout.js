import React from "react"
import Navbar from "./Navbar"
import "./css/Layout.css"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"
import SEO from "../components/seo"

const layout = ({ children }) => {
  if (!isLoggedIn()) {
    if (typeof window !== "undefined") {
      navigate("/app/login")
    }
    return null
  }

  return (
    <>
      <SEO />
      <main>{children}</main>
      <Navbar />
    </>
  )
}

export default layout
