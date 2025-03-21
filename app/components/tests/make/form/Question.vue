<script lang="ts" setup>
import { FormInput } from '@/constants/form.constant';
import { TestQuestionType } from '#shared/constants/test.constant';

interface Props {
  question: UserTestQuestion;
}

const { question } = defineProps<Props>();

const optionsPath: string = `${FormInput.QUESTIONS}.${question.number}.${FormInput.OPTIONS}`;
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    :type="question.type === TestQuestionType.SINGLE ? 'radio' : ''"
    :name="optionsPath"
  >
    <FormItem class="flex flex-col gap-y-2">
      <FormLabel class="text-base">
        <CommonGradientText>{{ question.number + 1 }}.</CommonGradientText>
        {{ question.text }}
      </FormLabel>

      <FormControl>
        <RadioGroup
          v-if="question.type === TestQuestionType.SINGLE"
          class="flex flex-col gap-y-2"
          v-bind="componentField"
        >
          <FormItem
            v-for="option in question.options"
            :key="`question-${question.number}-option-${option.number}`"
            class="flex items-center gap-x-3 space-y-0"
          >
            <FormControl>
              <RadioGroupItem :value="option.number.toString()" />
            </FormControl>

            <FormLabel class="font-normal">{{ option.text }}</FormLabel>
          </FormItem>
        </RadioGroup>

        <ol
          v-else-if="question.type === TestQuestionType.MULTIPLE"
          class="flex flex-col gap-y-2"
        >
          <li
            v-for="option in question.options"
            :key="`question-${question.number}-option-${option.number}`"
          >
            <FormField
              v-slot="{ value, handleChange }"
              type="checkbox"
              :value="option.number.toString()"
              :name="optionsPath"
            >
              <FormItem class="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    :checked="value.includes(option.number.toString())"
                    @update:checked="handleChange"
                  />
                </FormControl>

                <FormLabel class="font-normal">
                  {{ option.text }}
                </FormLabel>
              </FormItem>
            </FormField>
          </li>
        </ol>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
