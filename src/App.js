/* eslint-disable no-lone-blocks */
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
import NavBar from "./components/NavBar.js";
import "./App.css";

const Home = lazy(() => import("./components/Home.js"));
const SinglePost = lazy(() => import("./components/SinglePost.js"));
const Posts = lazy(() => import("./components/Posts.js"));
const Projects = lazy(() => import("./components/Projects.js"));

function App() {
  return (
    <>
      <BrowserRouter>
        <header className="flex-row">
          <NavBar />
        </header>
        <main className="main-container">
          <Suspense fallback={null}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/projects/:slug">
                <SinglePost />
              </Route>
              <Route path="/posts">
                <Posts />
              </Route>
              <Route path="/projects">
                <Projects />
              </Route>
            </Switch>
          </Suspense>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
