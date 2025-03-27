import {
    RegExpMatcher,
    TextCensor,
    englishDataset,
    englishRecommendedTransformers,
} from 'obscenity';

// Vérifie si une string contient du contenu injurieux
export function check_if_content_is_unacceptable(content: string) {
    const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers,
    });

    return matcher.hasMatch(content);
}
