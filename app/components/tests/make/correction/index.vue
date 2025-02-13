<script lang="ts" setup>
import { CheckIcon, XIcon } from 'lucide-vue-next';

import { TestQuestionType } from '#shared/constants/test';

interface Props {
  correction: IUserTestCorrectionQuestion[];
}

const { correction } = defineProps<Props>();

const emit = defineEmits(['retry']);
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
            <TestsMakeCorrectionSingle
              v-if="questionCorrection.type === TestQuestionType.SINGLE"
              :selected="optionCorrection.isUserSelected"
            />
            <TestsMakeCorrectionMultiple
              v-else-if="questionCorrection.type === TestQuestionType.MULTIPLE"
              :selected="optionCorrection.isUserSelected"
            />

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
              :size="16"
              class="shrink-0 stroke-green-700"
            />
            <XIcon
              v-else-if="optionCorrection.isUserSelected"
              :size="16"
              class="shrink-0 stroke-destructive"
            />
          </li>
        </ol>
      </li>
    </ol>

    <Button class="md:w-fit" @click="emit('retry')">
      {{ $t('tests.make.retry') }}
    </Button>
  </div>
</template>
