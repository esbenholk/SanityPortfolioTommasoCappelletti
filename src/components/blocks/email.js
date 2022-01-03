import React from "react";
import emailjs from "emailjs-com";

export default function ContactUs(basket) {
  var projects_html_string = `<div style="display:flex;flex-direction:column;">`;

  for (let index = 0; index < basket.basket.length; index++) {
    const project = basket.basket[index];
    console.log(project);
    const html_line = `<div style="display:flex-column;flex-direction:column;padding-right: 10px;"><img style="width: 100px; height: 100px; object-fit:cover;" src="${project.productImage.asset.url}"/><a href="https://tomatocappelletti.com/projects/${project.slug.current}" target="_blank"><h3>${project.title}</h3></a></div>`;
    projects_html_string = projects_html_string.concat(html_line);
    if (index === basket.basket.length - 1) {
      projects_html_string = projects_html_string.concat(`</div>`);
    }
  }

  function sendEmail(e) {
    e.preventDefault(); //This is important, i'm not sure why, but the email won't send without it

    emailjs
      .sendForm(
        "service_g276znq",
        "test_template",
        e.target,
        "user_XbRlloqdcOm7kOQnQC8BS"
      )
      .then(
        (result) => {
          console.log(result);
          basket.emptyBasket();
          // window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <form className="contact-form flex-column" onSubmit={sendEmail}>
      <input type="hidden" name="contact_number" />

      <div className="flex-row fullwidth justifyBetween">
        <h2 style={{ flex: "1" }}>Email</h2>
        <input
          type="email"
          name="from_email"
          style={{ flex: "2" }}
          placeholder="Insert your email"
        />
      </div>
      <div
        className="flex-row fullwidth justifyBetween"
        style={{ display: "none" }}
      >
        <input
          type="text"
          name="subject"
          style={{ flex: "2" }}
          placeholder="Insert Subject Line"
          value="New Cient"
        />
      </div>

      <div className="flex-row fullwidth justifyBetween">
        <h2 style={{ flex: "1" }}>Message</h2>
        <input
          style={{ flex: "2" }}
          name="text"
          placeholder="Hello, I am interested in the following projects:"
        />
      </div>
      <input
        style={{ display: "none" }}
        name="projects"
        readOnly
        value={projects_html_string}
      />

      <button type="submit" className="addToCartButton" value="Send">
        Send{" "}
      </button>
    </form>
  );
}