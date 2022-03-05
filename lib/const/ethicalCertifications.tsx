type Certification = {
    id: number;
    link: string;
    title: string;
};

const clothBrands: Certification[] = [
    {
        id: 1,
        link: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Global_Organic_Textile_Standard_logo.svg",
        title: "Global Organic Textile Standard (GOTS)",
    },
    {
        id: 2,
        link: "/certifications/bluesign.svg",
        title: "OEKO-TEX",
    },
    {
        id: 3,
        link: "/certifications/ocs.png",
        title: "Organic Content Standard (OCS)",
    },
    {
        id: 4,
        link: "https://upload.wikimedia.org/wikipedia/commons/e/ea/USDA_organic_seal.svg",
        title: "USDA Organic",
    },
];

export default clothBrands;
