import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { UrgencyStrip } from '@/components/sections/UrgencyStrip';
import { FeaturedGrid } from '@/components/sections/FeaturedGrid';
import { WhyChoose } from '@/components/sections/WhyChoose';
import { FounderStory } from '@/components/sections/FounderStory';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { InstagramGallery } from '@/components/sections/InstagramGallery';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <UrgencyStrip />
      <FeaturedGrid />
      <WhyChoose />
      <FounderStory />
      <ReviewsSection />
      <InstagramGallery />
    </>
  );
}
