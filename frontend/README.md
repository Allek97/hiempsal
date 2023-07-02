<a  href="https://hiempsal.ca"  rel="noopener">

<img  src="https://images.ctfassets.net/zk1zaxgr0lvi/2amjoO9j2wJIj0hxUgo4F6/186ac9b1ef143c802548711b31eae4e1/Frame_4.png?w=1400&h=1002&q=50&fm=webp"  alt="Work thumbnail"></a>

</p>

<h3 align="center">Hiempsal E-commerce</h3>

<div align="center"  >

<a  href="https://hiempsal.ca"  rel="noopener" align="center"> https://hiempsal.ca

</div>

<br>

<div  align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE.md)

</div>

---

<p  align="center">Fully functional e-commerce online shop powered by Shopify Storefront API and my own nextjs express server. You have access to many functionalities such as authentification,cart,checkout, adding reviews, asking questions, wishlist, recently viewed products and a fully customizable account with your order history and more. It's mainly built using nextjs and typescript with a scallable, resusable and tested code with a modern UI.

</p>

# What I made 💁‍♂️

Fully functional e-commerce online shop powered by Shopify Storefront API and my own nextjs express server. You have access to many functionalities such as authentification, cart,checkout, adding reviews, asking questions, wishlist, recently viewed products and a fully customizable account with your order history and more. It's mainly built using nextjs and typescript with a scalable, reusable and tested code with a modern UI.

# What I used 🔷

-   #### Nextjs/Typescript

    I used Nextjs with typescript in this website to build the user interfaces and my own server API.

-   ##### Tailwind/Emotion

    I mainly used tailwind and emotion styled-components to design this e-commerce website.

-   ##### React Testing Library

    I used RTL for unit and integration testing.

-   ##### Cypress

    I used Cypress to write E2E tests for authentication and payment.

-   ##### CircleCI

    Create and maintain fully automated CI/CD pipeline for code deployment using CircleCI.

-   ##### MongoDB/Mongoose

    I used MongoDB with mongoose to store and manipulate the data coming from my API such as reviews, wishlist, questions and more.

-   ##### Vercel

    I deployed it on Vercel.

-   ##### Shopify Storefront API

    This website is mainly powered by the Shopify to handle the main functionalities such as products, cart, checkout, customers and more.

-   ##### SWR

    I've used SWR to manage fetching, caching and revalidating data that is coming from the server.

-   ##### React Hook Form

    Extensively used RHF for form validation.

# Finally 😎

During the process of building this website I've learned how to write cleaner, reusable and scalable code. I've learned how to write unit and integration tests using react testing library and implement end to end tests with cypress.

I dove deeper into react and leveraged all the benefits of nextjs such as using server-side rendering (getSeverSideProps) and static site generation (getStaticProps/getStaticPaths) to generate content on the server which optimizes SEO and performance. I took advantage of nextjs API routes to write my own rest API directly in the framework with express and mongoose.

> I also implemented a scalable and reusable hook architecture to handle the data coming from the server either from shopify storefront API or my own rest API. There are two types of server-side data handling hooks:

-   ##### 1\. SWRHooks :

    Fetches the data from the server and manipulate it with SWR which gonna stale (cache data with a unique key) and refetch (revalidate.) it.
    <br>

    -   useCustomer: Will handle customer query then call useSWRHook to fetch and cache data
        <img  src="https://images.ctfassets.net/zk1zaxgr0lvi/2iOoaIwG27TkoMIeq9Ap7E/3963159c6cf4d5345a6b55ffeb2a1127/use-customer-code.png?w=1280&h=2712&q=100&fm=png"  alt="useCustomer code">

    -   useSWRHook: Fetch data and cache it with SWR using graphql query as key

         <img  src="https://images.ctfassets.net/zk1zaxgr0lvi/2GynFNnzSStfKwKBNkGc8O/f5d0f827e1e74aaf81bacde9094de499/use-swr-code.png?w=1434&h=1568&q=100&fm=png"  alt="useSWRHook code">

-   ##### 2\. MutationHooks :

    Used to modify server-side data (add products, delete review, etc.) which mutate the SWRHook that was caching the specific data.

    -   useCustomerUpdate: Will handle the customer mutation update then call useMutationHook to mutate SWR cached data

         <img  src="https://images.ctfassets.net/zk1zaxgr0lvi/7eupvvzdVVwuvV2N44Xn3K/2d0825df13ca97e0363989b460db966d/use-customer-update-code.png?w=1510&h=3020&q=100&fm=webp"  alt="useCustomerUpdate code">

    -   useMutationHook: Will mutate the SWR cached data

         <img  src="https://images.ctfassets.net/zk1zaxgr0lvi/7eupvvzdVVwuvV2N44Xn3K/2d0825df13ca97e0363989b460db966d/use-customer-update-code.png?w=1510&h=3020&q=100&fm=webp"  alt="useMutationHook code">

## 🧐 For more details <a name = "tech_stack"></a>

Please visit : https://iliasallek.com/hiempsal-e-commerce
