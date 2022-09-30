<a  href="https://iliasallek.com"  rel="noopener">

<img  src="https://hiempsal.s3.amazonaws.com/hiempsal-ecommerce-thumbnail.png"  alt="Project thumbnail"></a>

</p>

<h3  align="center">Hiempsal Shopify E-commerce</h3>

<div  align="center"  >

<a  href="https://iliasallek.com"  rel="noopener"  align="center"> https://hiempsal.vercel.app

</div>

<br>

<div  align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

</div>

---

<p  align="center">Fully functional e-commerce online shop powered by Shopify Storefront API and my own nextjs express server. You have access to many functionalities such as authentification,cart,checkout, adding reviews, asking questions, wishlist, recently viewed products and a fully customizable account with your order history and more. It's mainly built using nextjs and typescript with a scallable, resusable and tested code with a modern UI.

</p>

## 🥳 About This Production <a name = "problem_statement"></a>

During the process of building this website I've learned how to write cleaner, reusable and scalable code. I've learned how to write unit and integration tests using react testing library and implement end to end tests with cypress.

I dove deeper into react and levraged all the benefits of nextjs such as using server-side rendering (getSeverSideProps) and static site generation (getStaticProps/getStaticPaths) to generate content on the server which optimizes SEO and performance. I took advantage of nextjs API routes to write my own rest api directly in the framework with express and mongoose.

I also implemented a scalable and reusable hook architecture to handle the data coming from the server either from shopify storefront API or my own rest API. Their are two types of data server-side data handling hooks :

1.  SWRHooks which fetchs the data from the server and manipulate it with SWR which gonna stale(cache data with a unique key) and refetch (revalidate) it.
2.  MutationHooks are used to modify server-side data (add products,delete review,etc) which mutate the SWRHook caching the specific data.

The UI is styled using tailwindcss and emotion styled-components which facilatated the work and made my components easily reusable and customizable.

This app was definitely a challenge filled with problems to solve but I've enjoyed building it and I've had a lot of fun teaching myself new things.

## ⛏️ Built With <a name = "tech_stack"></a>

-   [NextJS](https://nextjs.org/) - I used Nextjs with typescript in this website to build the user interfaces and my own server API.

-   [Tailwind/Emotion](https://tailwindcss.com/) - I mainly used tailwind and emotion styled-components to design this e-commerce website.

-   [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - I used RTL to test some important components.

-   [MongoDB/Mongoose](https://mongoosejs.com/) - I used MongoDB with mongoose to store and manipulate the data coming from my API such as reviews, wishlist, questions and more.
-   [Vercel](https://vercel.com/) - I deployed it on Vercel.
-   [Shopify Storefront API](https://vercel.com/) - This website is mainly powered by the Shopify to handle the main functionalities such as products, cart, checkout, customers and more.
-   [SWR](https://swr.vercel.app/) - I've used SWR to manage fetching, caching and revalidating data that is coming from the server.

## 🧐 For more details <a name = "tech_stack"></a>

Please visit : https://iliasallek.com/hiempsal-shopify-e-commerce
