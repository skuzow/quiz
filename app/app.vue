<template>
  <GradientSVG />

  <ClientOnly>
    <LazyAuthSettings hydrate-on-visible />
    <LazyAlertProvider hydrate-on-visible />
    <LazyToaster hydrate-on-visible />
  </ClientOnly>

  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
