/* eslint-disable no-lone-blocks */
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy, useEffect, useState, createRef } from "react";
// import NavBar from "./components/NavBar.js";
import "./App.css";
import sanityClient from "./client";
import Header from "./components/Header_function";

import { AnimatePresence, motion } from "framer-motion";

import Footer from "./components/Footer";

import AppContext from "./globalState";

import ScrollToTop from "./components/blocks/scrollToTop";

import Basket from "./components/blocks/basket";
import Dropdown from "./components/blocks/dropdown";

import useWindowDimensions from "./components/functions/useWindowDimensions";

import Loader from "./components/blocks/loader";

const SinglePost = lazy(() => import("./components/stickyScrollComponent.js"));
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
        '*[_type == "siteSettings"]{title, greeting, More_skills_and_ideas, More_skills_and_ideas2, featured_project_title, mainImage{asset->{_id,url}, hotspot, alt}, mainImages, authorImage{asset->{_id,url}, hotspot, alt},  logo{asset->{_id,url}}, footerlogo{asset->{_id,url}},featuredProjects, about, contact, socialMediaHandles[]{logo{asset->{_id,url}},url, URLName}, contactDetails, contactHours}'
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
        '*[_type == "project"]{title,mainImage{asset->{_id,url}, hotspot, alt}, productImage{asset->{_id,url}, hotspot, alt}, year, abbreviated_year, star_rating ,slug, categories[]->{title, slug}, tags, color, recap,description, yearString}'
      )
      .then((data) => {
        data.sort((a, b) => b.year - a.year);
        setProjectList(data);
      })
      .catch(console.error);

    sanityClient
      .fetch('*[_type == "category"]{ title, slug, description, priority}')
      .then((data) => {
        data.sort((a, b) => a.priority - b.priority);
        console.log("has categories", data);
        // for (let index = 0; index < data.length; index++) {
        //   const category = data[index];
        //   if (category.title !== "Freebie") {
        //     categories.push(category);
        //   }
        // }
        setCategories(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    var tags = [];
    if (projectList) {
      for (let index = 0; index < projectList.length; index++) {
        const post = projectList[index];

        if (post.tags != null && Array.isArray(post.tags)) {
          for (let index = 0; index < post.tags.length; index++) {
            const tag = post.tags[index];
            tags.push(tag);
          }
        }
      }
      let sortedTags = [...new Set(tags)];
      setTags(sortedTags);
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
    if (string !== "remove") {
      setIsBasketOpen(!isBasketOpen);
    }
    setBasket_message(string);
  }

  return (
    <>
      {/* <Head>
        <title>{post[0]?.title}</title>
        <meta name="description" content={`${post[0]?.excerpt}`} />
        <meta property="og:title" content={post[0]?.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${fullUrl}`} />
        <meta
          property="og:image"
          content={`${
            post[0]?.featured_image?.formats?.thumbnail?.url ||
            post[0]?.featured_image?.url
          }`}
        />
      </Head> */}
      <main>
        <Suspense fallback={<Loader />}>
          <AppContext.Provider value={globalContext}>
            <BrowserRouter>
              {siteSettings && (
                <>
                  {" "}
                  {width > 1050 ? (
                    <nav className="fullWidthPadded normPaddingMobile">
                      <Header />
                      <div className="flex-row" style={{ minWidth: "40%" }}>
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
                      <nav
                        className="fullWidthPadded"
                        style={{ width: "100%" }}
                      >
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
                <motion.div
                  className="mainContainer"
                  ref={mainRef}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
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
                      <Route exact path="/projects/:slug">
                        <SinglePost updatebasket={updatebasket} />
                      </Route>
                      <Route path="/projects">
                        <ProjectList projectList={projectList} />
                      </Route>
                      <Route path="/about">
                        <Home info={siteSettings} projectList={projectList} />
                      </Route>
                      <Route path="/loader">
                        <Loader />
                      </Route>
                      <Route path="/:slug">
                        <Category />
                      </Route>
                    </Switch>
                  </ScrollToTop>
                </motion.div>
              </AnimatePresence>
              {siteSettings && <Footer />}
            </BrowserRouter>
          </AppContext.Provider>
        </Suspense>
      </main>
    </>
  );
}

export default App;
