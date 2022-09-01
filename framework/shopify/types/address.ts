import { Maybe } from "./commun";

export interface Address {
    id: Maybe<string>;
    name: Maybe<string>;
    address1: Maybe<string>;
    address2: Maybe<string>;
    city: Maybe<string>;
    country: Maybe<string>;
    countryCodeV2: Maybe<string>;
    zip: Maybe<string>;
    province: Maybe<string>;
    provinceCode: Maybe<string>;
    formatted: Maybe<string>[];
    formattedArea: Maybe<string>;
    firstName: Maybe<string>;
    lastName: Maybe<string>;
    phone: Maybe<string>;
    latitude: number | null;
    longitude: number | null;
    company: Maybe<string>;
}
