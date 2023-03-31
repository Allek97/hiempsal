const normalizeShopifyId = (shopifyId: string): string => {
    if (shopifyId.includes("gid://shopify")) {
        const arr: string[] = shopifyId.split("/");

        const id = `${arr[arr.length - 2]}-${arr[arr.length - 1]}`;

        return id;
    }

    return shopifyId;
};

const transformToShopifyId = (id: string): string =>
    `gid://shopify/${id.split("-").join("/")}`;

export { normalizeShopifyId, transformToShopifyId };
