import React from "react";
import "./Header.css";
import bgimage from "../assets/images/Astrologer.jpg";

const Header = () => {
  return (
    <>
      <section
        class="hero-wrap js-fullheight"
        style={{ backgroundImage: `url("${bgimage}")` }}
        data-section="home"
        data-stellar-background-ratio="0.5"
      >
        <div class="overlay"></div>
        <div class="container">
          <div
            class="row no-gutters slider-text js-fullheight align-items-center justify-content-start height-show"
            data-scrollax-parent="true"
          >
            <div class="col-md-6 pt-5 ftco-animate">
              <div class="mt-5">
                <span class="subheading">
                  Astrologer's Insight: Your Guide to a Brighter Future
                </span>
                <p class="mb-4 h1 ">
                  "Discover Your Destiny with Personalized Astrology Readings"
                </p>
                <p class="mb-4 contentText">
                  "Welcome to the world of astrology, where the movements of
                  celestial bodies shape our lives. Astrology is more than just
                  predicting the future; it's a powerful tool for self-discovery
                  and guidance. Explore the mysteries of the universe and unlock
                  the secrets of your destiny with our expert astrologers. Let
                  us illuminate your path, inspire your soul, and empower your
                  journey towards a brighter future."
                </p>
                <p>
                  <a href="/login" class="btn btn-primary py-3 px-4">
                    Register / Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
