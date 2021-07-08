/* eslint-disable no-lone-blocks */
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Suspense, lazy } from "react";
// import NavBar from "./components/NavBar.js";
import "./App.css";

const SinglePost = lazy(() => import("./components/SinglePost.js"));
const Posts = lazy(() => import("./components/Posts.js"));
const Projects = lazy(() => import("./components/Projects.js"));

{
  /* <header className="flex-row">
<NavBar />
</header> */
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Switch>
            <Route exact path="/">
              <Projects />
            </Route>
            <Route path="/:slug">
              <SinglePost />
            </Route>
            <Route path="/posts">
              <Posts />
            </Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
