export function toggleHover({ e }) {
  const thumbnail = e.target.parentNode.getElementsByClassName("seeOnHover")[0];

  if (thumbnail !== undefined && thumbnail.classList.contains("hidden")) {
    console.log("shows event", thumbnail);
    thumbnail.classList.remove("hidden");
    thumbnail.classList.add("visible");
  } else if (
    thumbnail !== undefined &&
    thumbnail.classList.contains("visible")
  ) {
    console.log("hides event", thumbnail);

    thumbnail.classList.remove("visible");
    thumbnail.classList.add("hidden");
  }
}
