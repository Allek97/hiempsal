export function getShopifyId(id: string): string {
    const url = id.split("/").pop();
    const shopifyId = url?.slice(0, url?.indexOf("?"));

    return shopifyId ?? "";
}
