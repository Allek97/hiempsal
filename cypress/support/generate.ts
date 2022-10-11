import { build } from "@jackfranklin/test-data-bot";
import { faker } from "@faker-js/faker";

type CustomerSignup = {
    firstName: string;
    email: string;
    password: string;
    phone: string;
};

const buildCustomer = build("Customer", {
    fields: {
        firstName: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.phoneNumber("+1 438-5##-####"),
    },
});

export { buildCustomer };
export type { CustomerSignup };
