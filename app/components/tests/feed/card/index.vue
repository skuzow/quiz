<script lang="ts" setup>
import {
  CircleCheck,
  FileQuestionIcon,
  CalendarIcon,
  LockIcon
} from 'lucide-vue-next';

interface Props {
  test: UserTestPartial;
}

const { test } = defineProps<Props>();

const imageAlt: string = `image-${test.id}`;
</script>

<template>
  <NuxtLinkLocale :to="`/tests/${test.id}`" :title="test.title">
    <CommonCard class="flex flex-col overflow-hidden sm:flex-row">
      <div class="relative border-b sm:w-1/4 sm:border-b-0 sm:border-r">
        <CommonPicture
          :src="test.image || '/images/test.avif'"
          :width="605"
          :height="140"
          loading="lazy"
          :alt="imageAlt"
          class="h-[110px] object-cover sm:h-[140px]"
        />

        <NuxtLinkLocale
          v-if="test.author"
          :to="`/users/${test.author.username || `id/${test.author.id}`}`"
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
        </NuxtLinkLocale>
      </div>

      <div class="p-6 sm:w-3/4">
        <h2 class="mb-1.5 truncate text-lg font-bold">
          <CommonGradientText direction="bottomTop">
            {{ test.title }}
          </CommonGradientText>
        </h2>

        <p class="mb-3 truncate text-sm">
          {{ test.description }}
        </p>

        <div
          :class="
            cn(
              'flex flex-col gap-y-3 sm:flex-row sm:gap-y-0',
              test.categories.length ? 'justify-between' : 'justify-end'
            )
          "
        >
          <TestsCategories
            v-if="test.categories.length"
            :categories="test.categories"
          />

          <ul class="flex h-[22px] gap-x-2 text-sm">
            <li class="flex items-center gap-x-1">
              {{ test.completed }}
              <CircleCheck :size="16" />
            </li>

            <li class="flex items-center gap-x-1">
              {{ test.questions }}
              <FileQuestionIcon :size="16" />
            </li>

            <li class="flex items-center gap-x-1">
              <CommonDate :date="test.createdAt" />
              <CalendarIcon :size="16" />
            </li>

            <li v-if="!test.published" class="flex items-center">
              <LockIcon :size="16" />
            </li>
          </ul>
        </div>
      </div>
    </CommonCard>
  </NuxtLinkLocale>
</template>
