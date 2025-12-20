// src/pages/Home/index.tsx
import Hero from "./Hero";
import ResidentialSection from "./ResidentialSection";
// import WhyWestBrookSection from "./WhyWestBrookSection";
import CommercialSection from "./CommercialSection";
import UpcomingProjects from "./UpcomingProjects";
import Testimonials from "./Testimonials";
import PartnersSection from "./PartnersSection";
import ContactSection from "./ContactSection";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section id="residential" className="wb-container py-14">
        <ResidentialSection />
      </section>

      {/* <section id="why-us" className="wb-container py-12">
        <WhyWestBrookSection />
      </section> */}

      <section id="commercial" className="wb-container py-14">
        <CommercialSection />
      </section>

      <section id="upcoming" className="wb-container py-14">
        <UpcomingProjects />
      </section>

      <section id="testimonials" className="wb-container py-14">
        <Testimonials />
      </section>

      <section id="partners" className="wb-container py-14">
        <PartnersSection />
      </section>

      <section id="contact" className="wb-container py-14">
        <ContactSection />
      </section>
    </main>
  );
}
