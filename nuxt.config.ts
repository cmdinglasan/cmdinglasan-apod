// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-headlessui", "@nuxtjs/tailwindcss", "@nuxtjs/eslint-module"],
  app: {
    head: {
      titleTemplate: "%s | cmdinglasan" || "cmdinglasan",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.bunny.net",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800,900",
        },
      ],
      noscript: [
        {
          children: "Javascript is required",
        },
      ],
    },
  },
});
