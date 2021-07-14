/* eslint-disable no-lone-blocks */
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
// import NavBar from "./components/NavBar.js";
import "./App.css";
import sanityClient from "./client";
import Header from "./components/Header.js";

import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer";

const SinglePost = lazy(() => import("./components/SinglePost.js"));
const LandingPage = lazy(() => import("./components/LandingPage.js"));
const ProjectList = lazy(() => import("./components/ProjectList.js"));
const Category = lazy(() => import("./components/Category.js"));
const Home = lazy(() => import("./components/Home.js"));

function App() {
  const [siteSettings, setSiteSettings] = useState();
  const [projectList, setProjectList] = useState();

  useEffect(() => {
    sanityClient
      .fetch(
        '*[_type == "siteSettings"]{title,mainImage{asset->{_id,url}, hotspot, alt}, logo{asset->{_id,url}}, about, contact, socialMediaHandles[]{logo{asset->{_id,url}},url}}'
      )
      .then((data) => {
        setSiteSettings(data[0]);
      })
      .catch(console.error);
    sanityClient
      .fetch(
        '*[_type == "project"]{title,mainImage{asset->{_id,url}, hotspot, alt}, year ,slug, categories[]->{title}, tags, color, recap}'
      )
      .then((data) => {
        data.sort((a, b) => b.year - a.year);
        setProjectList(data);
      })
      .catch(console.error);
  }, []);

  return (
    <main>
      <Suspense fallback={null}>
        <BrowserRouter>
          {siteSettings && <Header info={siteSettings} />}
          <AnimatePresence>
            <div className="mainContainer">
              <Switch>
                <Route exact path="/">
                  {siteSettings && (
                    <LandingPage
                      info={siteSettings}
                      projectList={projectList}
                    />
                  )}
                </Route>
                <Route path="/projects/:slug">
                  <SinglePost />
                </Route>
                <Route path="/projects">
                  <ProjectList projectList={projectList} />
                </Route>
                <Route path="/about">
                  <Home />
                </Route>
                <Route path="/:slug">
                  <Category />
                </Route>
              </Switch>
            </div>
          </AnimatePresence>
          {siteSettings && (
            <Footer info={siteSettings} projectList={projectList} />
          )}
        </BrowserRouter>
      </Suspense>
    </main>
  );
}

export default App;
