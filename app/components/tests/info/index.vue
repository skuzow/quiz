<script lang="ts" setup>
import {
  LockIcon,
  CalendarIcon,
  FileQuestionIcon,
  CircleCheck
} from 'lucide-vue-next';

interface Props {
  test: UserTest;
}

const { test } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-y-2 lg:flex-row lg:justify-between lg:gap-y-0">
    <div class="flex flex-col gap-y-2">
      <h1 class="overflow-hidden text-ellipsis text-2xl font-bold">
        <CommonGradientText direction="bottomTop">
          {{ test.title }}
        </CommonGradientText>
      </h1>

      <p class="overflow-hidden text-ellipsis">{{ test.description }}</p>
    </div>

    <ul class="flex gap-x-2 text-sm lg:items-start">
      <li v-if="!test.published" class="flex items-center py-0.5">
        <LockIcon :size="16" />
      </li>

      <li class="flex items-center gap-x-1">
        <CalendarIcon :size="16" />
        <CommonDate :date="test.createdAt" />
      </li>

      <li class="flex items-center gap-x-1">
        <FileQuestionIcon :size="16" />
        {{ test.questions.length }}
      </li>

      <li class="flex items-center gap-x-1">
        <CircleCheck :size="16" />
        {{ test.completed }}
      </li>
    </ul>
  </div>
</template>
