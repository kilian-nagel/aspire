export default function PrivacyPolicy() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 mt-12">Privacy Policy</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
                <p>By using the Aspire application services, you consent to and agree to follow this privacy policy.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Data Controller</h2>
                <p>The Aspire application is developed on a non-profit basis by a student. Hosting and authentication are managed by third-party services (Vercel and Supabase), but the responsibility for data collected through the application lies with me.</p>
                <p>Only I, Kilian Nagel (developer of the project), as well as third-party services (Vercel and Supabase), have access to the data.</p>
                <p>The data collected by the application will be used exclusively for core functionalities, such as habit tracking and social interactions.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Collected Data</h2>
                <p><strong>Data stored by the application:</strong></p>
                <p>Data is processed based on your consent. By using this application, you agree that certain data will be stored and processed.</p>
                <ul className="list-disc pl-6">
                    <li>User ID (integer format)</li>
                    <li>Username (defined by the user)</li>
                    <li>Data related to tracked habits and your activity within the application (statistics, chat messages, interactions, etc.)</li>
                </ul>
                <p>No data allowing a person to be uniquely identified (e.g., real name, address, phone number) is stored by the application.</p>
                <p><strong>Sensitive data collected by Supabase (via authentication):</strong></p>
                <p>These critical data points are stored to enable authentication. They are protected by security systems implemented by Supabase and Vercel.</p>
                <ul className="list-disc pl-6">
                    <li>Email address</li>
                    <li>Password (encrypted and secured, not accessible by me)</li>
                </ul>

                <strong>All your data will be deleted after 1 year of inactivity.</strong>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Purpose of Data Processing</h2>
                <p>The data is used to:</p>
                <ul className="list-disc pl-6">
                    <li>Enable access to the application and authentication.</li>
                    <li>Display usernames in communities and chat.</li>
                    <li>Ensure habit tracking and social interactions.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
                <p>Data is hosted by Vercel and Supabase, which implement advanced security measures (encryption, protection against attacks). On my side, I take precautions to prevent any leaks or unauthorized access.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Data Sharing</h2>
                <p>Data is never sold or shared with third parties for commercial purposes. However, third-party services such as Supabase manage authentication and store emails and passwords.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Your Rights (GDPR)</h2>
                <p>You have the following rights:</p>
                <ul className="list-disc pl-6">
                    <li>Right of access: You can request information on what data is stored about you.</li>
                    <li>Right of rectification: You can modify your username.</li>
                    <li>Right to be forgotten: You can request the deletion of your account and associated data.</li>
                    <li>Right to withdraw consent: You can delete your account at any time.</li>
                    <li>Right to object: Under GDPR, you can object to the processing of your personal data. However, the information collected by Aspire (username, tracked habits, chat messages) is strictly necessary for the proper functioning of the service. Therefore, objecting to data processing will result in the deletion of your account and all associated data.</li>
                    <li>Right to data portability: You have the right to obtain a copy of the data you have provided to Aspire (username, habit statistics, chat messages) in a structured and readable format (JSON). To request this, contact me at aspire.app.adm@gmail.com. The data will be provided within 30 days.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">8. Cookies and Tracking</h2>
                <p>The application does not use cookies for tracking or advertising purposes. However, Supabase and Vercel may use technical cookies to ensure authentication and proper service functionality.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">9. Policy Changes</h2>
                <p>This policy may be updated as the application evolves. Users will be notified of any changes via email.</p>
            </section>

            <p>For any questions or to exercise your rights, you can contact the Data Protection Officer at this address: <strong>aspire.app.adm@gmail.com</strong>. I will respond within a maximum of 30 days.</p>
        </div>
    );
}
