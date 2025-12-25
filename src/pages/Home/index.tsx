// src/pages/Home/index.tsx

import WhyWestBrookSection from "./WhyWestBrookSection";
import CommercialSection from "./CommercialSection";
import UpcomingProjects from "./UpcomingProjects";
import Testimonials from "./Testimonials";
import PartnersSection from "./PartnersSection";
import ContactSection from "./ContactSection";
import ProcessRoadmap from "./ProcessRoadmap";
import Hero from "./Hero";

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* <section id="residential" className="wb-container py-14">
        <ResidentialSection />
      </section> */}


      <section id="commercial" className="wb-container py-14">
        <CommercialSection />
      </section>

      <section id="process" className="wb-container py-10">
        <ProcessRoadmap />
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

      <section id="why-us" className="wb-container py-12">
        <WhyWestBrookSection />
      </section>
      <section id="contact" className="wb-container py-14">
        <ContactSection />
      </section>
    </main>
  );
}
