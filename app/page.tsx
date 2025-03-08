import HeroSection from "@/components/hero-section"
import FeatureSection from "@/components/feature-section"
import CtaSection from "@/components/cta-section";
import StyleLayout from "@/app/style-layout";

export default async function Home() {
    return (
        <StyleLayout>
            <main className="flex-1">
                <HeroSection />
                <FeatureSection />
                <CtaSection />
            </main>
        </StyleLayout>
    );
}
