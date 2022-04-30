// test.only("Adds selected variant to cart", () => {
//     renderProductCart();

//     const color = colorMap[productOptions[0].values[0].label];
//     const button = screen.getByTestId("cart-button");

//     // get the the options to be selected
//     const option1 = screen.getByText(RegExp(String.raw`${color}`, "i"));
//     const option2 = screen.getByText(
//         RegExp(String.raw`${productOptions[1].values[0].label}`, "i")
//     );
//     const option3 = screen.getByText(
//         RegExp(String.raw`${productOptions[2].values[0].label}`, "i")
//     );
//     // select variant
//     userEvent.click(option1);
//     userEvent.click(option2);
//     userEvent.click(option3);
//     // Add variant to cart
//     userEvent.click(button);
// });
