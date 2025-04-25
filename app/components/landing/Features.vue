<script lang="ts" setup>
import {
  SearchIcon,
  ListChecksIcon,
  CirclePlusIcon,
  WandSparklesIcon,
  type LucideIcon
} from 'lucide-vue-next';

const { t: $t } = useI18n();

interface Feature {
  title: string;
  description: string;
  button: {
    icon: LucideIcon;
    text: string;
    url: string;
  };
  image: {
    light: string;
    dark: string;
  };
}

const features: Feature[] = [
  {
    title: $t('landing.features.feed.title'),
    description: $t('landing.features.feed.description'),
    button: {
      icon: SearchIcon,
      text: $t('landing.features.feed.button'),
      url: '/tests'
    },
    image: {
      light: '/images/landing/light/feed.avif',
      dark: '/images/landing/dark/feed.avif'
    }
  },
  {
    title: $t('landing.features.make.title'),
    description: $t('landing.features.make.description'),
    button: {
      icon: ListChecksIcon,
      text: $t('landing.features.make.button'),
      url: '/tests'
    },
    image: {
      light: '/images/landing/light/make.avif',
      dark: '/images/landing/dark/make.avif'
    }
  },
  {
    title: $t('landing.features.create.title'),
    description: $t('landing.features.create.description'),
    button: {
      icon: CirclePlusIcon,
      text: $t('landing.features.create.button'),
      url: '/create'
    },
    image: {
      light: '/images/landing/light/create.avif',
      dark: '/images/landing/dark/create.avif'
    }
  },
  {
    title: $t('landing.features.generate.title'),
    description: $t('landing.features.generate.description'),
    button: {
      icon: WandSparklesIcon,
      text: $t('landing.features.generate.button'),
      url: '/generate'
    },
    image: {
      light: '/images/landing/light/generate.avif',
      dark: '/images/landing/dark/generate.avif'
    }
  }
];
</script>

<template>
  <section class="space-y-16">
    <div
      v-for="({ title, description, button, image }, index) in features"
      :key="title"
      :class="
        cn(
          'flex flex-col items-center justify-between gap-10',
          index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
        )
      "
    >
      <CommonCard class="w-full overflow-hidden md:w-3/5">
        <CommonPicture
          :src="image.light"
          :width="630"
          :height="380"
          loading="lazy"
          :alt="title"
          class="object-cover dark:hidden"
        />
        <CommonPicture
          :src="image.dark"
          :width="630"
          :height="380"
          loading="lazy"
          :alt="title"
          class="hidden object-cover dark:flex"
        />
      </CommonCard>

      <div class="w-full md:w-2/5">
        <h2 class="mb-4 text-3xl font-semibold md:text-4xl">
          <CommonGradientText direction="bottomTop">
            {{ title }}
          </CommonGradientText>
        </h2>
        <p class="mb-6 text-lg">{{ description }}</p>

        <NuxtLinkLocale :to="button.url" :title="button.text">
          <Button variant="secondary" class="gap-x-2">
            <component :is="button.icon" :size="16" />
            {{ button.text }}
          </Button>
        </NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>
