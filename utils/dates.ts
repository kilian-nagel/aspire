export function timeAgo(dateString: string): string {
    const inputDate = new Date(dateString);
    const now = new Date();

    if (isNaN(inputDate.getTime())) {
        throw new Error("Invalid date format");
    }

    const diffInMs = now.getTime() - inputDate.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays <= 2) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    // Return the exact date if > 2 days ago
    const formattedDate = inputDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    return formattedDate;
}
