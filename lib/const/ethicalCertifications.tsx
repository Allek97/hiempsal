type Certification = {
    id: number;
    link: string;
    title: string;
    website: string;
};

const clothBrands: Certification[] = [
    {
        id: 1,
        link: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Global_Organic_Textile_Standard_logo.svg",
        title: "Global Organic Textile Standard (GOTS)",
        website: "https://global-standard.org/",
    },
    {
        id: 2,
        link: "/certifications/bluesign.svg",
        title: "OEKO-TEX",
        website: "https://www.oeko-tex.com/en/",
    },
    {
        id: 3,
        link: "/certifications/ocs.png",
        title: "Organic Content Standard (OCS)",
        website:
            "https://textileexchange.org/standards/organic-content-standard/",
    },
    {
        id: 4,
        link: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Canadian_Organic_Seal.png",
        title: "Canadian Organic Seal",
        website: "http://canada-organic.ca/en",
    },
];

export default clothBrands;
