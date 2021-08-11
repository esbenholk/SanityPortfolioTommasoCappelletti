import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "2748ynqv",
  dataset: "production",
  apiVersion: "2021-03-25", // use a UTC date string
  useCdn: true, // `false` if you want to ensure fresh data
});
