<script lang="ts" setup>
const {
  initialOptionValue,
  initialQuestionValue,
  errorBag,
  isFieldDirty,
  question,
  options,
  questionPath,
  optionPath,
  createTest
} = useCreate();

const { FormInput, exampleMessage } = useFormMessage();
</script>

<template>
  <form class="flex w-full flex-col gap-y-8" @submit="createTest">
    <div class="flex flex-col gap-y-6">
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
    </div>

    <div
      v-for="(questionField, indexQuestion) in question.fields.value"
      :key="indexQuestion"
      class="flex flex-col gap-y-6"
    >
      <CreateQuestionForm
        :field="questionField"
        :index="indexQuestion"
        :path="questionPath(indexQuestion)"
        :is-field-dirty="isFieldDirty"
        :question="question"
      />

      <div
        v-if="options[indexQuestion]!.fields.value.length !== 0"
        class="flex flex-col gap-y-4"
      >
        <CreateOptionForm
          v-for="(_optionField, indexOption) in options[indexQuestion]!.fields
            .value"
          :key="indexOption"
          :index="indexOption"
          :path="optionPath(indexQuestion, indexOption)"
          :is-field-dirty="isFieldDirty"
          :option="options[indexQuestion]!"
        />
      </div>

      <CommonErrorBagMessages
        :error-bag="errorBag"
        :error-key="`questions[${indexQuestion}].options`"
      />

      <Button
        class="w-fit"
        variant="secondary"
        @click.prevent="options[indexQuestion]!.push(initialOptionValue)"
      >
        Add Option
      </Button>
    </div>

    <CommonErrorBagMessages :error-bag="errorBag" error-key="questions" />

    <div class="flex gap-x-2">
      <Button
        variant="secondary"
        @click.prevent="question.push(initialQuestionValue)"
      >
        Add Question
      </Button>

      <Button type="submit">Create</Button>
    </div>
  </form>
</template>
