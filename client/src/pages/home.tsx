import HeroSlideshow from "@/components/hero-slideshow";
import FeaturedWork from "@/components/featured-work";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div className="pt-16">
      <HeroSlideshow />
      <FeaturedWork />
      <Testimonials />
    </div>
  );
}
