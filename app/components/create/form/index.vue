<script lang="ts" setup>
interface Props {
  edit?: boolean;
}

const { edit } = defineProps<Props>();

const {
  isLoadingCreate,
  internalServerErrorCreate,
  initialIncorrectOptionValue,
  initialSingleQuestionValue,
  errorBag,
  isFieldDirty,
  questions,
  options,
  questionPath,
  optionPath,
  createTest
} = useCreate(edit);

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
        <FormItem v-auto-animate>
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
        <FormItem v-auto-animate>
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

      <CreateFormCategories />
    </div>

    <ol v-auto-animate class="flex flex-col gap-y-8">
      <li
        v-for="(questionField, indexQuestion) in questions.fields.value"
        :key="`question-${indexQuestion}`"
        class="flex flex-col gap-y-6"
      >
        <CreateFormQuestion
          :field="questionField"
          :index="indexQuestion"
          :path="questionPath(indexQuestion)"
          :is-field-dirty="isFieldDirty"
          :question="questions"
        />

        <ol
          v-if="options[indexQuestion]!.fields.value.length !== 0"
          v-auto-animate
          class="flex flex-col gap-y-4"
        >
          <li
            v-for="(_optionField, indexOption) in options[indexQuestion]!.fields
              .value"
            :key="`question-${indexQuestion}-option-${indexOption}`"
          >
            <CreateFormOption
              :question-field="questionField"
              :index="indexOption"
              :path="optionPath(indexQuestion, indexOption)"
              :is-field-dirty="isFieldDirty"
              :option="options[indexQuestion]!"
            />
          </li>
        </ol>

        <CommonErrorBagMessages
          :error-bag="errorBag"
          :error-key="`questions[${indexQuestion}].options`"
        />

        <CommonErrorBagMessages
          :error-bag="errorBag"
          :error-key="`questions[${indexQuestion}]`"
        />

        <div class="flex gap-x-2">
          <Button
            class="w-fit"
            variant="secondary"
            @click.prevent="
              options[indexQuestion]!.push(initialIncorrectOptionValue)
            "
          >
            {{ $t('create.form.addOption') }}
          </Button>

          <CreateFormType :path="questionPath(indexQuestion)" />
        </div>
      </li>
    </ol>

    <CommonErrorBagMessages :error-bag="errorBag" error-key="questions" />

    <CommonErrorMessage v-if="internalServerErrorCreate">
      {{ $t('error.internalServer') }}
    </CommonErrorMessage>

    <div class="flex gap-x-2">
      <Button
        variant="secondary"
        @click.prevent="questions.push(initialSingleQuestionValue)"
      >
        {{ $t('create.form.addQuestion') }}
      </Button>

      <Button type="submit">
        <IconLoader
          v-if="isLoadingCreate"
          class="mr-2 fill-primary-foreground"
        />
        {{ edit ? $t('edit.title') : $t('create.form.create') }}
      </Button>
    </div>
  </form>
</template>
