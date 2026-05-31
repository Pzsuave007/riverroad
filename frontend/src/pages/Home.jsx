import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import Equipment from "@/components/site/Equipment";
import Industries from "@/components/site/Industries";
import Gallery from "@/components/site/Gallery";
import QuoteForm from "@/components/site/QuoteForm";
import Footer from "@/components/site/Footer";

export default function Home() {
  return (
    <div data-testid="home-page" className="bg-zinc-950 text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Equipment />
        <Industries />
        <Gallery />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
