export default defineNuxtPlugin(async (nuxtApp) => {
  if (!nuxtApp.payload.serverRendered) {
    await useAuth().fetchSession();
  } else if (
    Boolean(nuxtApp.payload.prerenderedAt) ||
    Boolean(nuxtApp.payload.isCached)
  ) {
    nuxtApp.hook('app:mounted', async () => {
      await useAuth().fetchSession();
    });
  }
});
