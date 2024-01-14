import React from "react"
import Layout from "../components/Layout"
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/auth"

const Index = () => {
  if (isLoggedIn()) {
    if (typeof window !== "undefined") {
      logout(() => navigate(`/app/login`))
    }
    return null
  }

  return (
    <Layout>
      <h1>Hello {isLoggedIn() ? getUser().name : "world"}!</h1>
      <p>
        {isLoggedIn() ? (
          <>
            <p>You are now logged in, you can now </p>
            <Link to="/">Logout</Link>
          </>
        ) : (
          <>
            You should <Link to="/app/login">log in</Link> to see restricted
            content
          </>
        )}
      </p>
    </Layout>
  )
}
export default Index
