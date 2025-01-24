<script lang="ts" setup>
const {
  isFieldDirty,
  questionFields,
  pushQuestion,
  removeQuestion,
  createTest
} = useCreate();

const { FormInput } = useFormMessage();
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
            placeholder="Example title"
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
            placeholder="Example description"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- <div
        v-for="(question, indexQuestion) in createStore.createTestValue
          .questions"
        :key="indexQuestion"
        class="space-y-4 pb-6"
      >
        <FormField
          v-slot="{ componentField }"
          v-model="question.text"
          :name="`questions.${indexQuestion}.text`"
          :validate-on-blur="!createStore.isFieldDirty"
        >
          <FormItem>
            <FormLabel>{{ indexQuestion + 1 }}. Question</FormLabel>
            <FormControl>
              <Input
                type="text"
                :placeholder="`${indexQuestion + 1} Question text`"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-for="(option, indexOption) in question.options"
          v-slot="{ componentField }"
          :key="indexOption"
          v-model="option.text"
          :name="`questions.${indexQuestion}.options.${indexOption}.text`"
          :validate-on-blur="!createStore.isFieldDirty"
        >
          <FormItem>
            <FormLabel>{{ indexOption + 1 }}. Option</FormLabel>
            <FormControl>
              <div class="flex flex-row gap-x-2">
                <FormField
                  v-slot="{ handleChange }"
                  type="checkbox"
                  :name="`questions.${indexQuestion}.options.${indexOption}.isCorrect`"
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
                  :placeholder="`${indexOption + 1} Option text`"
                  v-bind="componentField"
                />

                <Button size="icon" variant="secondary" class="w-10">
                  <Trash2Icon :size="16" />
                  <span class="sr-only">
                    Delete test question {{ indexOption + 1 }}
                  </span>
                </Button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div> -->

    <div class="flex gap-x-2">
      <Button>Add Question</Button>
      <Button type="submit">Create</Button>
    </div>
  </form>
</template>
