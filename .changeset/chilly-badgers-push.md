---
'@astrojs/solid-js': major
---

Render SolidJS components using [renderToStringAsync](https://www.solidjs.com/docs/latest#rendertostringasync).

This changes the renderer of SolidJS components from renderToString to renderToStringAsync.

The server render phase will now wait for Suspense boundaries to resolve instead of immediately rendering the [Suspense](https://www.solidjs.com/docs/latest#suspense) fallback.

If your SolidJS component uses APIs such as [lazy](https://www.solidjs.com/docs/latest#lazy) or [createResource](https://www.solidjs.com/docs/latest#createresource), these functions may now be called on the server side.

This increases the power of the SolidJS integration. For example, server-only SolidJS components could now call async functions directly using the `createResource` API, like loading data from another API or using the async Astro Image function `getImage()`. It is unlikely that a server only component would make use of Suspense until now, so this should not be a breaking change for server-only components.

This could be a breaking change if:

- the component has a hydrating directive like `client:load`, and
- the component uses Suspense APIs like `lazy` or `createResource`, and
- the component uses Suspense fallback with the intention for it to be a server-side fallback

In this case, instead of relying on Suspense as a server-side fallback, use APIs like [isServer](https://www.solidjs.com/docs/latest/api#isserver) or `onMount()` to detect server mode and render the server fallback without using Suspense.
