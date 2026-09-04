import { PrimaryButton, SecondaryButton } from "./Buttons";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function HeroSection() {
  return (
    <section className="desite-hero" id="home" aria-labelledby="desite-hero-title">
      <div className="desite-container hero-layout">
        <div className="hero-copy">
          <p className="hero-introb">
             DeSite Screeners
          </p>
          <h2 id="desite-hero-title" className="title">
            Be a Dealer
          </h2>
          
          <p className="hero-intro">
            Mini Screeners for Mini Equipment<br></br>
            Rugged  /  Portable  /  Affordable with a 5 Year Structure Warranty
          </p>
           
          <a href="#contact" className="hero-contact-button">
            Contact Us
          </a>
        </div>
        <ImagePlaceholder
          label="Hero image coming soon"
          path=""
          tall
        />
      </div>
    </section>
  );
}
