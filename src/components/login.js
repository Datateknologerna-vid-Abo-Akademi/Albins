import React from "react"
import { StaticQuery, navigate, graphql } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"
import * as styles from "./css/login.module.css"
import "./css/Layout.css"
import SEO from "../components/seo"
import img from "../images/newalbin.svg"
import note from "../images/note.svg"
import github from "../images/githubi.png"

class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
  }

  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event, password) => {
    this.setState(
      {
        password: password,
      },
      () => {
        //callback
        event.preventDefault()
        handleLogin(this.state)
        navigate(`/categories`)
      }
    )
  }

  render() {
    if (isLoggedIn()) {
      navigate(`/categories`)
    }

    return (
      <StaticQuery
        query={graphql`
          {
            contentfulId {
              password
            }
          }
        `}
        render={data => (
          <>
            <SEO />
            <section className={styles.container}>
              <img alt="albin" className={styles.albin} src={img} />
              <img alt="note" className={styles.note} src={note} />
              <img alt="note" className={styles.note2} src={note} />
              <img alt="note" className={styles.note3} src={note} />
              <img alt="note" className={styles.note4} src={note} />
              <div className={styles.containerWrapper}>
                <form
                  method="post"
                  onSubmit={event => {
                    this.handleSubmit(event, data.contentfulId.password)
                  }}
                >
                  {/* uncomment for id password field}
              <p>ID</p>
              <input type="password" name="username" onChange={this.handleUpdate} />
              {*/}
                  <input type="submit" value="Skål!" />
                </form>
              </div>
              <div className={styles.github}>
                <a href="https://github.com/andreedd/Albins">
                  <img alt="github" src={github} />
                </a>
              </div>
            </section>
          </>
        )}
      ></StaticQuery>
    )
  }
}

export default Login
