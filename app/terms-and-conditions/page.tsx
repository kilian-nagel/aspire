import Link from "next/link";

export default function TermsAndConditions() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 mt-10">Terms and Conditions of Use</h1>
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p>By accessing or using (Aspire), you agree to be bound by these Terms and Conditions of Use ("Terms"). If you do not agree, you must refrain from using the App.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
                <p>You must be at least 16 years old or have parental consent to use this App. You are responsible for complying with all applicable laws.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Non-Lucrative Nature</h2>
                <p>This App is provided free of charge and does not engage in commercial activities. No paid services, advertisements, or monetization strategies are involved.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. User Responsibilities</h2>
                <p>By using the App, you agree not to:</p>
                <ul className="list-disc ml-6">
                    <li>Upload, share, or distribute illegal, harmful, defamatory, or copyrighted content without authorization.</li>
                    <li>Engage in any activities that violate applicable laws or regulations.</li>
                    <li>Disrupt, harm, or exploit the App or its users.</li>
                    <li>Use the App for fraudulent, misleading, or malicious activities.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Content Ownership & Rights</h2>
                <p>Users retain ownership of the content they upload. However, by uploading content, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute such content solely for the operation of the App.</p>
                <p>We reserve the right to remove any content that violates these Terms or applicable laws.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Data Storage & Privacy</h2>
                <p>All user data, including uploaded content and emails, is stored by Vercel. We do not assume responsibility for any data loss, breaches, or unauthorized access arising from Vercel’s infrastructure.</p>
                <p>We collect and store user emails solely for account-related purposes. Refer to our Privacy Policy for more details.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Third-Party Services</h2>
                <p>This App is hosted on Vercel and may integrate third-party services. We do not guarantee their reliability, security, or availability and are not responsible for any issues arising from their use.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">8. Disclaimers & Limitation of Liability</h2>
                <p>The App is provided "as is" without warranties of any kind. We disclaim all warranties, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
                <p>To the maximum extent permitted by law, we are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use the App, even if advised of the possibility of such damages.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">9. Modifications & Termination</h2>
                <p>We reserve the right to modify, suspend, or discontinue the App or these Terms at any time without notice. Your continued use after modifications constitutes acceptance of the new Terms.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">10. Governing Law & Dispute Resolution</h2>
                <p>These Terms are governed by the laws of France. Any disputes arising from these Terms or your use of the App shall be resolved exclusively in the courts of this country.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">11. Contact Information</h2>
                <p>For any questions regarding these Terms, contact us at <Link href="aspire.app.adm@gmail.com" className="underline">aspire.app.adm@gmail.com</Link>.</p>
            </section>
        </div>
    );
}


