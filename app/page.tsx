import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedGrid } from '@/components/sections/FeaturedGrid';
import { WhyChoose } from '@/components/sections/WhyChoose';
import { FounderStory } from '@/components/sections/FounderStory';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { InstagramGallery } from '@/components/sections/InstagramGallery';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedGrid />
      <WhyChoose />
      <FounderStory />
      <ReviewsSection />
      <InstagramGallery />
    </>
  );
}
