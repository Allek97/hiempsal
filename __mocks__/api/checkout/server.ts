import { setupServer } from "msw/node";
import { checkoutHandlers } from "./handlers";

export const server = setupServer(...checkoutHandlers);
