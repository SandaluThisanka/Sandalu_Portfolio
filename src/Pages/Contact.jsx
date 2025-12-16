import React, { useEffect, useState } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while we send your message",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const form = event.target;
      form.submit();

      Swal.fire({
        title: "Success!",
        text: "Your message has been sent successfully!",
        icon: "success",
        confirmButtonColor: "#f6c500",
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#f6c500",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="pt-12 pb-6 text-center section-shell">
        <h2
          data-aos="fade-down"
          data-aos-duration="1000"
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8]"
        >
          <span
            style={{
              color: "#f6c500",
              backgroundImage: "linear-gradient(120deg, #f6c500 0%, #fb923c 48%, #38bdf8 96%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact Me
          </span>
        </h2>
        <p
          data-aos="fade-up"
          data-aos-duration="1100"
          className="max-w-2xl mx-auto mt-2 text-sm text-slate-400 md:text-base"
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </p>
      </div>

      <div className="flex items-center justify-center h-auto section-shell" id="Contact">
        <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          <div
            data-aos="fade-right"
            data-aos-duration="1200"
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 transform transition-all duration-300 hover:shadow-[#f6c500]/20"
          >
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#f6c500] via-[#fb923c] to-[#38bdf8]">
                  Get in Touch
                </h2>
                <p className="text-gray-400">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-[#f6c500] opacity-60" />
            </div>

            <form action="" method="POST" onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div data-aos="fade-up" data-aos-delay="100" className="relative group">
                <User className="absolute left-5 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#f6c500] transition-colors" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-14 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#f6c500]/30 transition-all duration-300 hover:border-[#f6c500]/30 disabled:opacity-50"
                  required
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="200" className="relative group">
                <Mail className="absolute left-5 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#f6c500] transition-colors" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-14 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#f6c500]/30 transition-all duration-300 hover:border-[#f6c500]/30 disabled:opacity-50"
                  required
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="300" className="relative group">
                <MessageSquare className="absolute left-5 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#f6c500] transition-colors" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-14 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#f6c500]/30 transition-all duration-300 hover:border-[#f6c500]/30 h-[9.9rem] disabled:opacity-50"
                  required
                />
              </div>

              <button
                data-aos="fade-up"
                data-aos-delay="400"
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 text-[#0c0d11]" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="flex justify-center pt-6 mt-10 space-x-6 border-t border-white/10">
              <SocialLinks />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-2xl transform transition-all duration-300 hover:shadow-[#38bdf8]/20">
            <Komentar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;