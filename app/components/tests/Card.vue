<script lang="ts" setup>
import { EyeIcon } from 'lucide-vue-next';

interface Props {
  test: IUserTestPartial;
}

const { test } = defineProps<Props>();

const localePath = useLocalePath();

const imageAlt: string = `image-${test.id}`;

const tempCategories = ['Education', 'Science'];
</script>

<template>
  <div
    class="flex cursor-pointer flex-col rounded-xl border bg-card text-card-foreground shadow md:flex-row"
    @click="navigateTo(localePath(`/tests/${test.id}`))"
  >
    <div class="relative h-[110px] md:h-auto md:w-1/3">
      <img
        src="/images/test-image.avif"
        height="110"
        width="100%"
        loading="lazy"
        :title="imageAlt"
        :alt="imageAlt"
        class="h-full rounded-t-xl border-b object-cover md:rounded-bl-xl md:rounded-tr-none md:border-b-0 md:border-r"
      />

      <NuxtLink
        :to="localePath(`/users/${test.author.username || test.author.id}`)"
        :title="`${$t('nav.header.user.profile')} ${test.author.name}`"
        class="absolute bottom-2 left-2 h-10"
      >
        <CommonAvatar
          size="sm"
          :height="40"
          :width="40"
          loading="lazy"
          :user="test.author"
        />
      </NuxtLink>
    </div>

    <div class="p-6 md:w-2/3">
      <h2 class="mb-1.5 overflow-hidden text-ellipsis text-lg font-bold">
        <span
          class="bg-gradient-to-b from-gradient-start to-gradient-end bg-clip-text text-transparent"
        >
          {{ test.title }}
        </span>
      </h2>

      <p class="mb-3 truncate text-sm">
        {{ test.description }}
      </p>

      <div class="flex justify-between">
        <div class="flex gap-x-2">
          <Badge v-for="(category, index) in tempCategories" :key="index">
            {{ category }}
          </Badge>
        </div>

        <div class="flex items-center gap-x-1.5">
          {{ test.views }}
          <EyeIcon :size="16" />
        </div>
      </div>
    </div>
  </div>
</template>
