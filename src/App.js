/* eslint-disable no-lone-blocks */
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy, useEffect, useState, createRef } from "react";
// import NavBar from "./components/NavBar.js";
import "./App.css";
import sanityClient from "./client";
import Header from "./components/Header_function";

import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer";

import AppContext from "./globalState";

import ScrollToTop from "./components/blocks/scrollToTop";

import Basket from "./components/blocks/basket";
import Dropdown from "./components/blocks/dropdown";

import useWindowDimensions from "./components/functions/useWindowDimensions";

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
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const [basket_message, setBasket_message] = useState("Your cart is empty.");

  const [hasFeaturedPosts, setHasFeaturedPosts] = useState(false);

  const mainRef = createRef();

  const { width } = useWindowDimensions();

  ///get data from website and so
  useEffect(() => {
    ///get the site settings and basic info
    sanityClient
      .fetch(
        '*[_type == "siteSettings"]{title, greeting, mainImage{asset->{_id,url}, hotspot, alt}, mainImages, authorImage{asset->{_id,url}, hotspot, alt},  logo{asset->{_id,url}}, footerlogo{asset->{_id,url}},featuredProjects, about, contact, socialMediaHandles[]{logo{asset->{_id,url}},url, URLName}, contactDetails, contactHours}'
      )
      .then((data) => {
        setSiteSettings(data[0]);
        if (data[0].featuredProjects && data[0].featuredProjects.length > 0) {
          setHasFeaturedPosts(true);
        }
      })
      .catch(console.error);
    ////get all the projects
    sanityClient
      .fetch(
        '*[_type == "project"]{title,mainImage{asset->{_id,url}, hotspot, alt}, productImage{asset->{_id,url}, hotspot, alt}, year, abbreviated_year, star_rating ,slug, categories[]->{title, slug}, tags, color, recap, yearString}'
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

            if (categories.some((item) => item.title === category.title)) {
              console.log("obejct in array already");
            } else {
              categories.push(category);
              console.log(category, categories);
            }
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
    mainRef: mainRef,
    setSiteSettings,
    setProjectList,
    setBasket,
    setTags,
    setCategories,
    setHasFeaturedPosts,
  };

  function updatebasket(string) {
    if (string != "remove") {
      setIsBasketOpen(!isBasketOpen);
    }
    setBasket_message(string);
  }

  return (
    <main>
      <Suspense fallback={null}>
        <AppContext.Provider value={globalContext}>
          <BrowserRouter>
            {siteSettings && (
              <>
                {" "}
                {width > 950 ? (
                  <nav className="fullWidthPadded">
                    <Header />
                    <div className="flex-row" style={{ minWidth: "50%" }}>
                      <Dropdown categories={categories} mainRef={mainRef} />
                      <Basket
                        basket={basket}
                        basket_message={basket_message}
                        isBasketOpen={isBasketOpen}
                        updatebasket={updatebasket}
                      />
                    </div>
                  </nav>
                ) : (
                  <>
                    <nav className="fullWidthPadded" style={{ width: "100%" }}>
                      <div className="flex-row" style={{ width: "100%" }}>
                        <Header />
                        <Basket
                          basket={basket}
                          isBasketOpen={isBasketOpen}
                          basket_message={basket_message}
                          updatebasket={updatebasket}
                        />
                      </div>
                      <Dropdown categories={categories} mainRef={mainRef} />
                    </nav>
                  </>
                )}
              </>
            )}

            <AnimatePresence>
              <div className="mainContainer" ref={mainRef}>
                <ScrollToTop>
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
                      <SinglePost updatebasket={updatebasket} />
                    </Route>
                    <Route path="/projects">
                      <ProjectList projectList={projectList} />
                    </Route>
                    <Route path="/about">
                      <Home info={siteSettings} projectList={projectList} />
                    </Route>
                    <Route path="/:slug">
                      <Category />
                    </Route>
                  </Switch>
                </ScrollToTop>
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
