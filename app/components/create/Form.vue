<script lang="ts" setup>
import { ChevronUpIcon, ChevronDownIcon, Trash2Icon } from 'lucide-vue-next';

const {
  initialQuestionValue,
  isFieldDirty,
  questionFields,
  pushQuestion,
  removeQuestion,
  swapQuestion,
  createTest
} = useCreate();

const { FormInput, exampleMessage } = useFormMessage();
</script>

<template>
  <form class="mt-6 w-full space-y-6" @submit="createTest">
    <FormField
      v-slot="{ componentField }"
      :name="FormInput.TITLE"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem>
        <FormLabel>{{ $t('form.title') }}</FormLabel>
        <FormControl>
          <Input
            type="text"
            :placeholder="exampleMessage(FormInput.TITLE)"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ componentField }"
      :name="FormInput.DESCRIPTION"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem>
        <FormLabel>{{ $t('form.description') }}</FormLabel>
        <FormControl>
          <Textarea
            type="text"
            :placeholder="exampleMessage(FormInput.DESCRIPTION)"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div
      v-for="(questionField, indexQuestion) in questionFields"
      :key="indexQuestion"
      class="flex flex-col gap-y-4 pb-6"
    >
      <FormField
        v-slot="{ componentField }"
        v-model="(questionField.value as IUserTestQuestion).text"
        :name="`${FormInput.QUESTIONS}.${indexQuestion}.text`"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormLabel>
            {{ indexQuestion + 1 }}. {{ $t('form.question') }}
          </FormLabel>
          <FormControl>
            <div class="flex flex-row gap-x-2">
              <Input
                type="text"
                :placeholder="
                  exampleMessage(FormInput.QUESTION, indexQuestion + 1)
                "
                v-bind="componentField"
              />

              <Button
                v-if="indexQuestion !== 0"
                size="icon"
                variant="secondary"
                class="w-10"
                @click.prevent="swapQuestion(indexQuestion, indexQuestion - 1)"
              >
                <ChevronUpIcon :size="16" />
                <span class="sr-only">
                  Swap Up test option {{ indexQuestion + 1 }}
                </span>
              </Button>

              <Button
                v-if="indexQuestion !== questionFields.length - 1"
                size="icon"
                variant="secondary"
                class="w-10"
                @click.prevent="swapQuestion(indexQuestion, indexQuestion + 1)"
              >
                <ChevronDownIcon :size="16" />
                <span class="sr-only">
                  Swap Down test option {{ indexQuestion + 1 }}
                </span>
              </Button>

              <Button
                size="icon"
                variant="secondary"
                class="w-10"
                @click="removeQuestion(indexQuestion)"
              >
                <Trash2Icon :size="16" />
                <span class="sr-only">
                  Delete test option {{ indexQuestion + 1 }}
                </span>
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-for="(option, indexOption) in (
          questionField.value as IUserTestQuestion
        ).options"
        v-slot="{ componentField }"
        :key="indexOption"
        v-model="option.text"
        :name="`${FormInput.QUESTIONS}.${indexQuestion}.${FormInput.OPTIONS}.${indexOption}.text`"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormLabel>{{ indexOption + 1 }}. {{ $t('form.option') }}</FormLabel>
          <FormControl>
            <div class="flex flex-row gap-x-2">
              <FormField
                v-slot="{ handleChange }"
                type="checkbox"
                :name="`${FormInput.QUESTIONS}.${indexQuestion}.${FormInput.OPTIONS}.${indexOption}.isCorrect`"
              >
                <FormItem>
                  <FormControl>
                    <Checkbox
                      :checked="option.isCorrect"
                      class="h-9 w-9"
                      @update:checked="handleChange"
                    />
                  </FormControl>
                </FormItem>
              </FormField>

              <Input
                type="text"
                :placeholder="exampleMessage(FormInput.OPTION, indexOption + 1)"
                v-bind="componentField"
              />

              <Button size="icon" variant="secondary" class="w-10">
                <Trash2Icon :size="16" />
                <span class="sr-only">
                  Delete test option {{ indexOption + 1 }}
                </span>
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <div class="flex gap-x-2">
      <Button @click.prevent="pushQuestion(initialQuestionValue)">
        Add Question
      </Button>
      <Button type="submit">Create</Button>
    </div>
  </form>
</template>
