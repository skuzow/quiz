<template>
  <div class="relative grid min-h-dvh grid-rows-[auto_1fr_auto] gap-2">
    <NavHeader />
    <main class="container flex max-w-6xl flex-1 flex-col gap-10 py-4 md:px-8">
      <slot />
    </main>
    <NavFooter />
  </div>
</template>
