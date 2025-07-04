import sport from "@/images/sports.svg";
import heart from "@/images/heart.svg";
import books from "@/images/books.svg";
import character from "@/images/character.svg";
import chat from "@/images/chat.svg";
import finance from "@/images/finance.svg";
import paint from "@/images/paint.svg";
import bulb from "@/images/bulb.svg";

export const resolver = (icon_name: string) => {
    switch (icon_name) {
        case "Health & Fitness":
            return sport;
        case "Wellness & Self-Care":
            return heart;
        case "Productivity & Work":
            return books;
        case "Personal Growth & Learning":
            return bulb;
        case "Social & Relationships":
            return chat;
        case "Finance & Budgeting":
            return finance;
        case "Creativity & Hobbies":
            return paint;
        case "Spirituality & Mindfulness":
            return character;
        default:
            return character;
    }
};
