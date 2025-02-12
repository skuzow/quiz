<script lang="ts" setup>
import { CheckIcon, XIcon, CircleIcon } from 'lucide-vue-next';

import { TestQuestionType } from '#shared/constants/test';

interface Props {
  correction: IUserTestCorrectionQuestion[];
}

const { correction } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <ol class="flex flex-col gap-y-8">
      <li
        v-for="questionCorrection in correction"
        :key="questionCorrection.number"
        class="flex flex-col gap-y-4"
      >
        <h2 class="font-medium">
          <CommonGradientText>
            {{ questionCorrection.number + 1 }}.
          </CommonGradientText>
          {{ questionCorrection.text }}
        </h2>

        <ol class="flex flex-col gap-y-2">
          <li
            v-for="optionCorrection in questionCorrection.options"
            :key="optionCorrection.number"
            class="flex items-center gap-x-3"
          >
            <div
              v-if="questionCorrection.type === TestQuestionType.MULTIPLE"
              class="h-4 w-4 shrink-0 rounded-sm border border-primary"
            >
              <CheckIcon
                v-if="optionCorrection.isUserSelected"
                :size="14"
                class="bg-primary stroke-background"
              />
            </div>
            <div
              v-else-if="questionCorrection.type === TestQuestionType.SINGLE"
              class="flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary"
            >
              <CircleIcon
                v-if="optionCorrection.isUserSelected"
                :size="12"
                class="fill-primary"
              />
            </div>

            <span
              class="text-sm leading-none"
              :class="{
                'text-green-700': optionCorrection.isCorrect,
                'text-destructive':
                  !optionCorrection.isCorrect && optionCorrection.isUserSelected
              }"
            >
              {{ optionCorrection.text }}
            </span>

            <CheckIcon
              v-if="optionCorrection.isCorrect"
              :size="14"
              class="shrink-0 stroke-green-700"
            />
            <XIcon
              v-else-if="optionCorrection.isUserSelected"
              :size="14"
              class="shrink-0 stroke-destructive"
            />
          </li>
        </ol>
      </li>
    </ol>

    <Button class="md:w-fit">Retry</Button>
  </div>
</template>
