<script lang="ts" setup>
import {
  SearchIcon,
  ListChecksIcon,
  CirclePlusIcon,
  WandSparklesIcon
} from 'lucide-vue-next';

const features = [
  {
    title: 'Discover the Right Test',
    description:
      'Filter and sort through our extensive library of tests to find the perfect test for your goals, fast and easy.',
    button: {
      icon: SearchIcon,
      text: 'Search now',
      url: '/tests'
    },
    image: {
      light: '/images/landing/light/feed.avif',
      dark: '/images/landing/dark/feed.avif'
    }
  },
  {
    title: 'Take Tests with Ease',
    description:
      'Dive into pre-made tests, answer questions smoothly with our optimized interface.',
    button: {
      icon: ListChecksIcon,
      text: 'Start making',
      url: '/tests'
    },
    image: {
      light: '/images/landing/light/make.avif',
      dark: '/images/landing/dark/make.avif'
    }
  },
  {
    title: 'Design Custom Tests',
    description:
      'Take full creative control with our flexible editor. Craft questions and score exactly how you want them.',
    button: {
      icon: CirclePlusIcon,
      text: 'Open editor',
      url: '/create'
    },
    image: {
      light: '/images/landing/light/create.avif',
      dark: '/images/landing/dark/create.avif'
    }
  },
  {
    title: 'AI-Powered Test Generator',
    description:
      'Generate tailored tests in seconds. Just upload your content or describe what you need, and our AI does the rest.',
    button: {
      icon: WandSparklesIcon,
      text: 'Generate now',
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
          class="h-full object-cover dark:hidden md:w-full"
        />
        <CommonPicture
          :src="image.dark"
          :width="630"
          :height="380"
          loading="lazy"
          :alt="title"
          class="hidden h-full object-cover dark:flex md:w-full"
        />
      </CommonCard>

      <div class="w-full md:w-2/5">
        <h3 class="mb-4 text-3xl font-semibold md:text-4xl">
          <CommonGradientText direction="bottomTop">
            {{ title }}
          </CommonGradientText>
        </h3>
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
