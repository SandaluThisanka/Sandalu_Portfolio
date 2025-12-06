import React, { useState, useEffect } from "react";
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
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: 'Sending Message...',
      html: 'Please wait while we send your message',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      // Get form data
      const form = e.target;
      const formData = new FormData(form);

      // Submit form
      await form.submit();

      // Show success message
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully!',
        icon: 'success',
        confirmButtonColor: '#facc15',
        timer: 2000,
        timerProgressBar: true
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        confirmButtonColor: '#facc15'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-section" id="Contact">
      <div className="section-glow -top-32 left-[-12%]" />
      <div className="section-glow section-glow--blue bottom-[-16rem] right-[-8rem]" />
      <div className="section-content">
        <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]">
          <h2
            data-aos="fade-down"
            data-aos-duration="1000"
            className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto accent-heading"
          >
            <span
              style={{
                color: "#facc15",
                backgroundImage:
                  "linear-gradient(45deg, #facc15 10%, #fbbf24 93%)",
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
            className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
          >
            Got a question? Send me a message, and I'll get back to you soon.
          </p>
        </div>

        <div className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0">
          <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
            <div
              data-aos="fade-right"
              data-aos-duration="1200"
              className="glow-card rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-300 hover:shadow-[0_40px_60px_rgba(250,204,21,0.18)]"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-4xl font-bold mb-3 accent-heading">
                    Get in Touch
                  </h2>
                  <p className="text-gray-400">
                    Have something to discuss? Send me a message and let's talk.
                  </p>
                </div>
                <Share2 className="w-10 h-10 text-[rgba(250,204,21,0.9)] opacity-60" />
              </div>

              <form 
                action=""
                method="POST"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* FormSubmit Configuration */}
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />

                <div
                  data-aos="fade-up"
                  data-aos-delay="100"
                  className="relative group"
                >
                  <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-[rgba(250,204,21,0.9)]" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[rgba(250,204,21,0.28)] transition-all duration-300 hover:border-[rgba(250,204,21,0.3)] disabled:opacity-50"
                    required
                  />
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="200"
                  className="relative group"
                >
                  <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-[rgba(250,204,21,0.9)]" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[rgba(250,204,21,0.28)] transition-all duration-300 hover:border-[rgba(250,204,21,0.3)] disabled:opacity-50"
                    required
                  />
                </div>
                <div
                  data-aos="fade-up"
                  data-aos-delay="300"
                  className="relative group"
                >
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 transition-colors group-focus-within:text-[rgba(250,204,21,0.9)]" />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[rgba(250,204,21,0.28)] transition-all duration-300 hover:border-[rgba(250,204,21,0.3)] h-[9.9rem] disabled:opacity-50"
                    required
                  />
                </div>
                <button
                  data-aos="fade-up"
                  data-aos-delay="400"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#facc15] via-[#fbbf24] to-[#f59e0b] text-[#0b0d18] py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_28px_45px_rgba(250,204,21,0.25)] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              <div className="mt-10 pt-6 border-t border-white/10 flex justify-center space-x-6">
                <SocialLinks />
              </div>
            </div>

            <div className="glow-card rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-2xl transform transition-all duration-300 hover:shadow-[0_36px_50px_rgba(250,204,21,0.18)]">
              <Komentar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;