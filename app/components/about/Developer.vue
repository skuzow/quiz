<script lang="ts" setup>
import { GithubIcon, GlobeIcon, MailIcon } from 'lucide-vue-next';
</script>

<template>
  <section>
    <CommonSectionTitle
      :title="$t('about.developer.title')"
      :description="$t('about.developer.description')"
    />

    <CommonCard
      class="flex flex-col items-center gap-10 p-8 sm:p-12 md:flex-row md:p-16"
    >
      <NuxtImg
        src="https://avatars.githubusercontent.com/u/61398114"
        :width="200"
        :height="200"
        loading="lazy"
        decoding="async"
        title="Logo"
        alt="Logo"
        class="rounded-full"
      />

      <div>
        <h3 class="text-2xl font-semibold">
          <CommonGradientText direction="bottomTop">
            Alejandro Porras (skuzow)
          </CommonGradientText>
        </h3>
        <p class="mb-4 text-lg font-medium">
          {{ $t('about.developer.card.role') }}
        </p>

        <p class="mb-4 max-w-2xl">
          {{ $t('about.developer.card.description') }}
        </p>

        <ul class="flex gap-x-1">
          <li>
            <NuxtLink
              to="https://skuzow.com"
              :title="$t('about.developer.card.links.website')"
              target="_blank"
            >
              <Button size="icon" variant="ghost">
                <GlobeIcon :size="18" />
              </Button>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="https://github.com/skuzow"
              title="GitHub"
              target="_blank"
            >
              <Button size="icon" variant="ghost">
                <GithubIcon :size="18" />
              </Button>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink
              to="mailto:hello@skuzow.com"
              :title="$t('about.developer.card.links.contact')"
            >
              <Button size="icon" variant="ghost">
                <MailIcon :size="18" />
              </Button>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </CommonCard>
  </section>
</template>
