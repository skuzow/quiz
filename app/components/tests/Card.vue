<script lang="ts" setup>
import { EyeIcon, FileQuestionIcon } from 'lucide-vue-next';

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
    class="flex cursor-pointer flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow sm:flex-row"
    @click="navigateTo(localePath(`/tests/${test.id}`))"
  >
    <div class="relative border-b sm:w-1/4 sm:border-b-0 sm:border-r">
      <CommonPicture
        src="/images/test.avif"
        height="140"
        width="605"
        loading="lazy"
        :alt="imageAlt"
        class="h-[110px] object-cover sm:h-[140px]"
      />

      <NuxtLink
        v-if="test.author"
        :to="
          localePath(`/users/${test.author.username || `id/${test.author.id}`}`)
        "
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

    <div class="p-6 sm:w-3/4">
      <h2 class="mb-1.5 truncate text-lg font-bold">
        <CommonGradientText class="bg-gradient-to-b">
          {{ test.title }}
        </CommonGradientText>
      </h2>

      <p class="mb-3 truncate text-sm">
        {{ test.description }}
      </p>

      <div class="flex justify-between">
        <ul class="flex gap-x-2">
          <li v-for="(category, index) in tempCategories" :key="index">
            <Badge>{{ category }}</Badge>
          </li>
        </ul>

        <div class="flex gap-x-2">
          <div class="flex items-center gap-x-1">
            {{ test.views }}
            <EyeIcon :size="16" />
          </div>

          <div class="flex items-center gap-x-1">
            {{ test.questions }}
            <FileQuestionIcon :size="16" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
