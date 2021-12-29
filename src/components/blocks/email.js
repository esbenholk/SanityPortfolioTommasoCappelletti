import React from "react";
import emailjs from "emailjs-com";

export default function ContactUs(basket) {
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
          window.location.reload(); //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
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
        <input type="email" name="from_email" style={{ flex: "2" }} />
      </div>
      <div className="flex-row fullwidth justifyBetween">
        <h2 style={{ flex: "1" }}>Subject</h2>
        <input type="text" name="subject" style={{ flex: "2" }} />
      </div>

      <div className="flex-row fullwidth justifyBetween">
        <h2 style={{ flex: "1" }}>Message</h2>
        <input
          style={{ flex: "2" }}
          name="text"
          placeholder="Hello, I am interested in the following projects:"
        />
      </div>

      <input type="submit" className="addToCartButton" value="Send" />
    </form>
  );
}
