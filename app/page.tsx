import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
import WhyChooseUs from "@/components/WhyChooseUs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { fetchWebsiteContent } from "@/lib/cms";

const ContactForm = dynamic(() => import("@/components/ContactForm"));

export default async function Home() {
  const { content } = await fetchWebsiteContent();

  return (
    <>
      <Navbar />
      <Hero content={content.hero} />
      <Services content={content.services} />
      <Industries />
      <Clients />
      <Stats content={content.stats} />
      <WhyChooseUs content={content.whyChooseUs} />
      <CTA content={content.cta} contact={content.contact} />
      <ContactForm contact={content.contact} />
      <Footer
        content={content.contact}
        meta={content.meta}
        social={content.social}
      />
    </>
  );
}
