
import Link from "next/link";

export default function Page() {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 mt-10">Conditions d'utilisation</h1>
            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">1. Acceptation des Conditions</h2>
                <p>En accédant ou en utilisant (Aspire), vous acceptez d'être lié par ces Conditions Générales d'Utilisation ("Conditions"). Si vous n'êtes pas d'accord, vous devez vous abstenir d'utiliser l'Application.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">2. Éligibilité</h2>
                <p>Vous devez avoir au moins 16 ans ou disposer du consentement parental pour utiliser cette Application. Vous êtes responsable du respect de toutes les lois applicables.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">3. Nature Non Lucrative</h2>
                <p>Cette Application est fournie gratuitement et n'exerce aucune activité commerciale. Aucun service payant, publicité ou stratégie de monétisation n'est impliqué.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">4. Responsabilités de l'Utilisateur</h2>
                <p>En utilisant l'Application, vous acceptez de ne pas :</p>
                <ul className="list-disc ml-6">
                    <li>Téléverser, partager ou distribuer du contenu illégal, nuisible, diffamatoire ou protégé par des droits d’auteur sans autorisation.</li>
                    <li>Participer à des activités qui enfreignent les lois ou réglementations en vigueur.</li>
                    <li>Perturber, nuire ou exploiter l'Application ou ses utilisateurs.</li>
                    <li>Utiliser l'Application à des fins frauduleuses, trompeuses ou malveillantes.</li>
                </ul>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">5. Propriété et Droits sur le Contenu</h2>
                <p>Les utilisateurs conservent la propriété du contenu qu'ils téléversent. Toutefois, en téléversant du contenu, vous nous accordez une licence non exclusive, mondiale et sans redevance pour utiliser, afficher et distribuer ce contenu uniquement pour le fonctionnement de l'Application.</p>
                <p>Nous nous réservons le droit de supprimer tout contenu qui enfreint ces Conditions ou les lois applicables.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">6. Stockage des Données et Confidentialité</h2>
                <p>Toutes les données des utilisateurs, y compris le contenu téléversé et les e-mails, sont stockées par Vercel. Nous ne sommes pas responsables des pertes de données, violations ou accès non autorisés découlant de l’infrastructure de Vercel.</p>
                <p>Nous collectons et stockons les e-mails des utilisateurs uniquement à des fins liées aux comptes. Consultez notre Politique de Confidentialité pour plus de détails.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">7. Services Tiers</h2>
                <p>Cette Application est hébergée sur Vercel et peut intégrer des services tiers. Nous ne garantissons ni leur fiabilité, ni leur sécurité, ni leur disponibilité, et nous ne sommes pas responsables des problèmes découlant de leur utilisation.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">8. Exclusions de Garantie et Limitation de Responsabilité</h2>
                <p>L'Application est fournie "en l'état" sans aucune garantie de quelque nature que ce soit. Nous déclinons toute garantie, expresse ou implicite, y compris, mais sans s'y limiter, les garanties de qualité marchande, d'adéquation à un usage particulier et de non-contrefaçon.</p>
                <p>Dans les limites maximales autorisées par la loi, nous ne sommes pas responsables des dommages directs, indirects, accidentels, consécutifs ou punitifs résultant de l'utilisation ou de l'impossibilité d'utiliser l'Application, même si nous avons été informés de la possibilité de tels dommages.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">9. Modifications et Résiliation</h2>
                <p>Nous nous réservons le droit de modifier, suspendre ou interrompre l'Application ou ces Conditions à tout moment, sans préavis. La poursuite de votre utilisation après des modifications constitue une acceptation des nouvelles Conditions.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">10. Loi Applicable et Règlement des Litiges</h2>
                <p>Ces Conditions sont régies par les lois de la France. Tout litige découlant de ces Conditions ou de votre utilisation de l'Application sera soumis exclusivement aux tribunaux de ce pays.</p>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb-2">11. Informations de Contact</h2>
                <p>Pour toute question concernant ces Conditions, contactez-nous à <Link href="aspire.app.adm@gmail.com" className="underline">aspire.app.adm@gmail.com</Link>.</p>
            </section>
        </div>
    );
}
