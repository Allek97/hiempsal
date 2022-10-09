import { build } from "@jackfranklin/test-data-bot";
import { faker } from "@faker-js/faker";

const buildCustomer = build("Customer", {
    fields: {
        firstName: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.phoneNumber("+1 438-###-####"),
    },
});

export { buildCustomer };
