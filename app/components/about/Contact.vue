<template>
  <section>
    <CommonCard
      class="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16"
    >
      <CommonSectionTitle
        :title="$t('about.contact.title')"
        :description="$t('about.contact.description')"
        class="mb-6 md:max-w-2xl"
      />

      <NuxtLink
        to="mailto:contact@quiz.skuzow.com"
        :title="$t('about.contact.button')"
      >
        <Button>{{ $t('about.contact.button') }}</Button>
      </NuxtLink>
    </CommonCard>
  </section>
</template>
