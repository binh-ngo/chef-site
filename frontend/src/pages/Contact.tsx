import React, { useRef } from "react";
import emailjs from '@emailjs/browser';
const logo = require('../assets/clear-logo.png')

export const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);

  const [clicked, setClicked] = React.useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setClicked(true);
    if (form.current) {
      emailjs
        .sendForm(
          "service_4i4xmp7",
          "template_mrmovgj",
          form.current,
          "1UA4xHgoYEgO0KucC"
        )
        .then(
          (result) => {
            console.log(result.text);
            console.log("message sent");
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-600 text-white z-10">
      <div className="rounded px-8 pt-6 pb-8 mb-4 z-10">
        <h2 className="text-2xl font-bold mb-4">Contact me</h2>

        <form ref={form} onSubmit={sendEmail}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="user_name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              name="user_email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              placeholder="Enter your message"
              rows={4}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Send"
            />
          </div>
        </form>
      </div>
        {clicked && <p className="mt-4 text-center">Thank you for your message! I will get back to you soon!</p>}
      <div>
        <img src={logo} className="absolute inset-0 w-full h-full object-cover z-0" alt="background" />
      </div>
    </div>
  );
};

