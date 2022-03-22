export const truncateText = (content: string, maxLength = 29): string => {
    const contentCut = content.substring(0, maxLength - 1);

    if (content.length > maxLength) return `${contentCut}...`;
    return contentCut;
};
