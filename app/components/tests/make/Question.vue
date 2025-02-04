<script lang="ts" setup>
import { TestQuestionType } from '#shared/constants/test';

interface Props {
  question: IUserTestQuestion;
}

const { question } = defineProps<Props>();

const { FormInput } = useFormMessage();

const optionsPath = (indexQuestion: number) =>
  `${question.type === TestQuestionType.SINGLE ? 'singleQuestions' : 'multipleQuestions'}.${indexQuestion}.${FormInput.OPTIONS}`;
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    :type="question.type === TestQuestionType.SINGLE ? 'radio' : ''"
    :name="optionsPath(question.number)"
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
            v-for="(option, indexOption) in question.options"
            :key="indexOption"
            class="flex items-center gap-x-3 space-y-0"
          >
            <FormControl>
              <RadioGroupItem :value="indexOption.toString()" />
            </FormControl>

            <FormLabel class="font-normal">{{ option.text }}</FormLabel>
          </FormItem>
        </RadioGroup>

        <ul
          v-else-if="question.type === TestQuestionType.MULTIPLE"
          class="flex flex-col gap-y-2"
        >
          <li
            v-for="(option, indexOption) in question.options"
            :key="indexOption"
          >
            <FormField
              v-slot="{ value, handleChange }"
              type="checkbox"
              :value="option.text"
              :name="optionsPath(question.number)"
            >
              <FormItem class="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    :checked="value.includes(option.text)"
                    @update:checked="handleChange"
                  />
                </FormControl>

                <FormLabel class="font-normal">
                  {{ option.text }}
                </FormLabel>
              </FormItem>
            </FormField>
          </li>
        </ul>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
