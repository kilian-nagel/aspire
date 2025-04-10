export default function PrivacyPolicy() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 mt-12">Charte de confidentialité</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Acceptation des conditions</h2>
                <p>En utilisant les services de l'application Aspire, vous consentez et acceptez de suivre cette charte de confidentialité.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Responsable du traitement</h2>
                <p>L’application Aspire est développée à titre non lucratif par un étudiant. L’hébergement et l’authentification sont gérés par des services tiers (Vercel et Supabase), mais la responsabilité des données collectées via l’application m’incombe.</p>
                <p>Seul moi, Kilian Nagel (développeur du projet), ainsi que les services tiers (Vercel et Supabase), ont accès aux données</p>
                <p>Les données collectées par l'application seront exclusivement utilisées pour les activités métiers. C'est-à-dire le suivi des habitudes, les intéractions sociales.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Données collectées</h2>
                <p><strong>Données stockées par l’application :</strong></p>
                <p>Les données sont traités sur la base de votre consentement. Lorsque vous utiliser cette application vous consentez à ce certaines données soient stockées et traitées.</p>
                <ul className="list-disc pl-6">
                    <li>Identifiant utilisateur (ID, format entier)</li>
                    <li>Nom d’utilisateur (username, défini par l’utilisateur)</li>
                    <li>Données relatives aux habitudes suivies et à votre activité dans l'application (statistiques, messages dans le chat, intéraction, etc.)</li>
                </ul>
                <p>Aucune donnée permettant d’identifier une personne de manière unique (ex. nom réel, adresse, téléphone) n’est stockée par l’application.</p>
                <p><strong>Données sensibles collectées par Supabase (via l’authentification) :</strong></p>
                <p>Ces données critiques sont stockées pour permettre l'authentification. Elle sont protégés par des systèmes de sécurité mis en place par Supabase et Vercel.</p>
                <ul className="list-disc pl-6">
                    <li>Adresse e-mail</li>
                    <li>Mot de passe (chiffré et sécurisé, non accessible par moi)</li>
                </ul>

                <strong>L'ensemble de vos données seront supprimées après 1 an d'inactivité.</strong>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Finalités du traitement</h2>
                <p>Les données sont utilisées pour :</p>
                <ul className="list-disc pl-6">
                    <li>Permettre l’accès à l’application et l’authentification.</li>
                    <li>Afficher les noms d’utilisateurs dans les communautés et le chat.</li>
                    <li>Assurer le suivi des habitudes et des interactions sociales.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Sécurité des données</h2>
                <p>Les données sont hébergées par Vercel et Supabase, qui mettent en place des mesures de sécurité avancées (chiffrement, protection contre les attaques). De mon côté, je prends des précautions pour éviter toute fuite ou accès non autorisé.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Partage des données</h2>
                <p>Les données ne sont jamais vendues ou partagées avec des tiers à des fins commerciales. Cependant, des services tiers comme Supabase gèrent l’authentification et stockent des emails et mots de passe.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Vos droits (RGPD)</h2>
                <p>Vous disposez des droits suivants :</p>
                <ul className="list-disc pl-6">
                    <li>Droit d’accès : vous pouvez demander quelles informations sont stockées sur vous.</li>
                    <li>Droit de rectification : vous pouvez modifier votre username.</li>
                    <li>Droit à l’oubli : vous pouvez demander la suppression de votre compte et de ses données associées.</li>
                    <li>Droit de retrait du consentement : vous pouvez supprimer votre compte à tout moment.</li>
                    <li>Droit d'opposition : Conformément au RGPD, vous pouvez vous opposer au traitement de vos données personnelles. Toutefois, les informations collectées par Aspire (nom d'utilisateur, habitudes suivies, messages dans le chat) sont strictement nécessaires au bon fonctionnement du service. Par conséquent, l'opposition au traitement de ces données entraîne la suppression de votre compte et de toutes les données associées.</li>
                    <li>Droit à la portabilité : Vous avez le droit de récupérer une copie des données que vous avez fournies à Aspire (nom d'utilisateur, statistiques d’habitudes, messages dans le chat) dans un format structuré et lisible (JSON). Pour en faire la demande, contactez-moi à aspire.app.adm@gmail.com. Les données vous seront transmises sous un délais de 30 jours</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">8. Cookies et suivi</h2>
                <p>L’application n’utilise pas de cookies à des fins de suivi ou de publicité. Cependant, Supabase et Vercel peuvent utiliser des cookies techniques pour assurer l’authentification et le bon fonctionnement du service.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">9. Modifications de la charte</h2>
                <p>Cette charte peut être mise à jour en fonction des évolutions de l’application. Les utilisateurs seront informés des changements par mail.</p>
            </section>

            <p>Pour toute question ou pour exercer vos droits, vous pouvez contactez le Responsable de la protection des données à cette adresse : <strong>aspire.app.adm@gmail.com</strong>. Je vous répondrai dans un délais de 30 jours maximum.</p>
        </div>
    );
}

