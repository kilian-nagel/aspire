interface ObjectWithId {
    id: string | number;
}

export function merge_data<T extends ObjectWithId>(
    data1: T[],
    data2: T[],
): T[] {
    // On récupère les ids du tableau n°1.
    const ids: { [key: string]: number } = {};
    for (const item of data1) {
        ids[item.id.toString()] = 1;
    }

    // On ajoute les éléments du tableau 2 au tableau 1 seulement s'ils n'ont pas déjà été ajoutés
    const final_items = data1;
    for (const item of data2) {
        // On n'ajoute pas éléments avec une id déjà existante
        if (!ids[item.id]) final_items.push(item);
    }

    return final_items;
}
