

/**
 * Génère une chaîne de caractères indiquant le temps écoulé depuis une date donnée.
 * 
 * @param {string} dateString - Une date sous forme de chaîne (format ISO 8601 recommandé).
 * @returns {string} Une chaîne indiquant le temps écoulé depuis la date fournie (ex. : "10 days ago", "2 hours ago").
 */
export function timeAgo(dateString: string): string {
    const inputDate = new Date(dateString);
    const now = new Date();
    let display_text = "";

    if (isNaN(inputDate.getTime())) {
        throw new Error("Invalid date format");
    }

    const diffInMs = now.getTime() - inputDate.getTime();
    const one_second = 1000;
    const one_minute = 60000;
    const one_hour = 3600000;
    const one_day = 86400000;
    let time = 0;

    if (!(diffInMs >= one_minute)) {
        time = Math.floor(diffInMs / one_second);
        display_text = `${time} second`;
    } else if (!(diffInMs >= one_hour)) {
        time = Math.floor(diffInMs / one_minute);
        display_text = `${time} minutes`;
    } else if (!(diffInMs >= one_day)) {
        time = Math.floor(diffInMs / one_hour);
        display_text = `${time} hour`;
    } else {
        const formattedDate = inputDate.toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        return formattedDate;
    }

    let plural = time > 1 ? "s" : "";
    return display_text + plural + " ago";
}
