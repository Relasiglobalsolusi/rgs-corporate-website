import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Industries />
      <Clients />
      <Stats />
      <WhyChooseUs />
      <CTA />
      <ContactForm />
      <Footer />
    </>
  );
}