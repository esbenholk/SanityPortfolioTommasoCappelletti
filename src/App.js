/* eslint-disable no-lone-blocks */
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
// import NavBar from "./components/NavBar.js";
import "./App.css";
import sanityClient from "./client";
import Header from "./components/Header.js";

import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer";

import AppContext from "./globalState";

const SinglePost = lazy(() => import("./components/SinglePost.js"));
const LandingPage = lazy(() => import("./components/LandingPage.js"));
const ProjectList = lazy(() => import("./components/ProjectList.js"));
const Category = lazy(() => import("./components/Category.js"));
const Home = lazy(() => import("./components/Home.js"));

function App() {
  const [siteSettings, setSiteSettings] = useState();
  const [projectList, setProjectList] = useState();

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const [basket, setBasket] = useState([]);

  const [hasFeaturedPosts, setHasFeaturedPosts] = useState(false);

  useEffect(() => {
    sanityClient
      .fetch(
        '*[_type == "siteSettings"]{title,mainImage{asset->{_id,url}, hotspot, alt}, logo{asset->{_id,url}}, featuredProjects, about, contact, socialMediaHandles[]{logo{asset->{_id,url}},url}}'
      )
      .then((data) => {
        setSiteSettings(data[0]);
        if (data[0].featuredProjects && data[0].featuredProjects.length > 0) {
          setHasFeaturedPosts(true);
        }
      })
      .catch(console.error);

    sanityClient
      .fetch(
        '*[_type == "project"]{title,mainImage{asset->{_id,url}, hotspot, alt}, productImage{asset->{_id,url}, hotspot, alt}, year ,slug, categories[]->{title}, tags, color, recap}'
      )
      .then((data) => {
        data.sort((a, b) => b.year - a.year);
        setProjectList(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    var tags = [];
    var categories = [];
    if (projectList) {
      for (let index = 0; index < projectList.length; index++) {
        const post = projectList[index];

        if (post.tags != null && Array.isArray(post.tags)) {
          for (let index = 0; index < post.tags.length; index++) {
            const tag = post.tags[index];
            tags.push(tag);
          }
        }
        if (post.categories != null && Array.isArray(post.categories)) {
          for (let index = 0; index < post.categories.length; index++) {
            const category = post.categories[index];
            categories.push(category.title);
          }
        }
      }

      let sortedTags = [...new Set(tags)];
      setTags(sortedTags);

      let sortedCategories = [...new Set(categories)];
      setCategories(sortedCategories);
    }
  }, [projectList]);

  const globalContext = {
    siteSettings: siteSettings,
    projectList: projectList,
    basket: basket,
    tags: tags,
    categories: categories,
    hasFeaturedPosts: hasFeaturedPosts,
    setSiteSettings,
    setProjectList,
    setBasket,
    setTags,
    setCategories,
    setHasFeaturedPosts,
  };

  return (
    <main>
      <Suspense fallback={null}>
        <AppContext.Provider value={globalContext}>
          <BrowserRouter>
            {siteSettings && <Header />}
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
            {siteSettings && <Footer />}
          </BrowserRouter>
        </AppContext.Provider>
      </Suspense>
    </main>
  );
}

export default App;
