/* eslint-disable no-lone-blocks */
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
// import NavBar from "./components/NavBar.js";
import "./App.css";
import sanityClient from "./client";
import Header from "./components/Header.js";

const SinglePost = lazy(() => import("./components/SinglePost.js"));
const LandingPage = lazy(() => import("./components/LandingPage.js"));
const ProjectList = lazy(() => import("./components/ProjectList.js"));

function App() {
  const [siteSettings, setSiteSettings] = useState();
  const [projectList, setProjectList] = useState();

  useEffect(() => {
    sanityClient
      .fetch(
        '*[_type == "siteSettings"]{title,mainImage{asset->{_id,url}, hotspot, alt}, logo{asset->{_id,url}}, about, contact}'
      )
      .then((data) => {
        setSiteSettings(data[0]);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        '*[_type == "project"]{title,mainImage{asset->{_id,url}, hotspot, alt}, year, categories}'
      )
      .then((data) => {
        console.log(data);
        data.sort((a, b) => b.year - a.year);
        setProjectList(data);
      })
      .catch(console.error);
  }, []);

  return (
    <main>
      <BrowserRouter>
        {siteSettings && <Header info={siteSettings} />}

        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/">
              {siteSettings && <LandingPage info={siteSettings} />}
            </Route>
            <Route path="/projects/:slug">
              <SinglePost />
            </Route>
            <Route path="/projects">
              <ProjectList projectList={projectList} />
            </Route>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </main>
  );
}

export default App;
