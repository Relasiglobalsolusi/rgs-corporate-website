import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Stats from "@/components/Stats";
import RgsOne from "@/components/RgsOne";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import CareersStrip from "@/components/CareersStrip";
import { fetchWebsiteContent } from "@/lib/cms";
import { localize, type Lang } from "@/lib/i18n";
import { whatsappNumbers } from "@/lib/whatsapp";

const ContactForm = dynamic(() => import("@/components/ContactForm"));

/** The home page in either language ("/" and "/id"). */
export default async function HomePage({ lang }: { lang: Lang }) {
  const { content: raw } = await fetchWebsiteContent();
  const content = localize(lang, raw);
  const whatsapp = whatsappNumbers(raw.contact);

  return (
    <div lang={lang}>
      <Navbar lang={lang} page="home" />
      <main>
        <Hero content={content.hero} lang={lang} />
        <Clients lang={lang} />
        <Services content={content.services} lang={lang} />
        <Industries lang={lang} />
        <Stats content={content.stats} />
        <RgsOne lang={lang} />
        <WhyChooseUs content={content.whyChooseUs} lang={lang} />
        <CareersStrip lang={lang} recruitment={whatsapp.recruitment} />
        <ContactForm cta={content.cta} contact={raw.contact} lang={lang} whatsapp={whatsapp} />
      </main>
      <Footer content={raw.contact} meta={content.meta} social={raw.social} lang={lang} whatsapp={whatsapp} />
      <WhatsappButton lang={lang} page="home" numbers={whatsapp} />
    </div>
  );
}
