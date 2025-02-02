<script lang="ts" setup>
import { TestQuestionType } from '~~/shared/constants/test';

interface Props {
  question: IUserTestQuestion;
}

const { question } = defineProps<Props>();

const { FormInput } = useFormMessage();

const optionPath = (indexQuestion: number, indexOption: number) =>
  `${FormInput.QUESTIONS}.${indexQuestion}.${FormInput.OPTIONS}.${indexOption}`;
</script>

<template>
  <FormField v-slot="{ componentField }" type="radio" name="type">
    <FormItem class="flex flex-col gap-y-2">
      <FormLabel class="text-base">
        <CommonGradientText>{{ question.number + 1 }}.</CommonGradientText>
        {{ question.text }}
      </FormLabel>

      <FormControl>
        <RadioGroup
          v-if="question.type === TestQuestionType.SINGLE"
          class="mt-0 flex flex-col gap-y-2"
          v-bind="componentField"
        >
          <FormItem
            v-for="(option, indexOption) in question.options"
            :key="indexOption"
            class="flex items-center gap-x-3 space-y-0"
          >
            <FormControl>
              <RadioGroupItem :value="`${question.number}-${indexOption}`" />
            </FormControl>

            <FormLabel class="font-normal">{{ option.text }}</FormLabel>
          </FormItem>
        </RadioGroup>

        <!-- <ul v-if="question.type === TestQuestionType.MULTIPLE">
          <li
            v-for="(option, indexOption) in question.options"
            :key="indexOption"
            class="flex flex-col gap-y-1.5"
          >
            <FormField
              v-slot="{ value, handleChange }"
              type="checkbox"
              :name="optionPath(question.number, indexOption)"
            >
              <FormItem class="flex flex-row items-start space-x-3 space-y-0">
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
        </ul> -->
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
