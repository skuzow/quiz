<template>
  <div class="relative grid min-h-dvh grid-rows-[auto_1fr_auto] gap-2">
    <NavHeader />
    <main class="container max-w-6xl py-4 md:my-11 md:px-8">
      <slot />
    </main>
    <NavFooter />
  </div>
</template>
