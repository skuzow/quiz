<template>
  <section class="flex flex-col items-center text-center">
    <h1 class="mb-5 text-5xl font-extrabold md:mb-8 md:max-w-3xl md:text-7xl">
      <CommonGradientText>
        {{ $t('nav.header.about.title') }}
      </CommonGradientText>
    </h1>

    <p class="text-pretty text-xl md:mb-9 md:max-w-xl">
      {{ $t('nav.header.about.description') }}
    </p>
  </section>
</template>
