<template>
  <section>
    <CommonCard
      class="flex flex-col items-center justify-center p-8 sm:p-12 md:p-16"
    >
      <CommonSectionTitle
        :title="$t('landing.action.title')"
        :description="$t('landing.action.description')"
        class="mb-6"
      />

      <div class="flex gap-x-4">
        <NuxtLinkLocale to="/tests" :title="$t('landing.action.buttons.start')">
          <Button>{{ $t('landing.action.buttons.start') }}</Button>
        </NuxtLinkLocale>

        <NuxtLinkLocale to="/about" :title="$t('landing.action.buttons.more')">
          <Button variant="secondary">
            {{ $t('landing.action.buttons.more') }}
          </Button>
        </NuxtLinkLocale>
      </div>
    </CommonCard>
  </section>
</template>
