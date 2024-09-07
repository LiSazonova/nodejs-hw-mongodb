const parseType = (type) => {
    const isString = typeof type === 'string';
    if (!isString) return undefined;
    const isType = (type) => ['work', 'home', 'personal'].includes(type);

    if (isType(type)) return type;
    return undefined;
};

const parseIsFavourite = (isFavourite) => {
    if (typeof isFavourite === 'undefined') {
        return undefined;
    }

    const parsedIsFavourite = isFavourite === 'true' || isFavourite === 'false'
        ? JSON.parse(isFavourite.toLowerCase())
        : undefined;

    return parsedIsFavourite;
};

export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedType = parseType(type);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
        type: parsedType,
        isFavourite: parsedIsFavourite,
    };
};
