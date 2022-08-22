export interface Customer {
    id: string;
    email: string;
    firstName: string;
    phone: string;
    acceptsMarketing?: boolean;
    lastName?: string;
    defaultAddress?: any;
}
