import {Button} from "@/components/ui/button";

export default function CtaSection() {
    return (
        <section className="py-16 px-4 md:py-24 bg-muted/50">
            <div className="mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to transform your habits?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Join thousands of users who have already improved their daily routines and achieved their goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="px-8">
                        Get Started
                    </Button>
                    <Button size="lg" variant="outline" className="px-8">
                        Learn More
                    </Button>
                </div>
            </div>
        </section>);
}
