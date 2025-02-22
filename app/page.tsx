import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import CtaSection from "@/components/cta-section";

export default async function Home() {
    return (
        <main className="flex-1">
            <HeroSection />
            <FeatureSection />
            <CtaSection />
        </main>
    );
}
