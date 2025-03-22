<script lang="ts" setup>
import { FormInput } from '@/constants/form.constant';
import {
  TestQuestionTypeValues,
  TEST_GENERATION_QUESTION_OPTIONS_MIN,
  TEST_GENERATION_QUESTION_OPTIONS_MAX
} from '#shared/constants/test.constant';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isFieldDirty: any;
}

const { isFieldDirty } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-y-6">
    <FormField v-slot="{ componentField }" :name="FormInput.TYPE">
      <FormItem>
        <FormLabel>{{ $t('form.type') }}</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue class="mr-2" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="ALL">{{ $t('form.types.all') }}</SelectItem>
              <SelectItem
                v-for="type in TestQuestionTypeValues"
                :key="type"
                :value="type"
              >
                {{ $t(`form.types.${type.toLowerCase()}`) }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ value, handleChange }"
      :name="FormInput.QUESTIONS"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem v-auto-animate>
        <FormLabel>{{ $t('form.questions') }}</FormLabel>
        <NumberField
          :default-value="5"
          :min="1"
          :max="10"
          :model-value="value"
          @update:model-value="handleChange"
        >
          <NumberFieldContent>
            <NumberFieldDecrement />
            <FormControl>
              <NumberFieldInput />
            </FormControl>
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField
      v-slot="{ value, handleChange }"
      :name="FormInput.OPTIONS"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem v-auto-animate>
        <FormLabel>{{ $t('form.options') }}</FormLabel>
        <NumberField
          :min="TEST_GENERATION_QUESTION_OPTIONS_MIN"
          :max="TEST_GENERATION_QUESTION_OPTIONS_MAX"
          :model-value="value"
          @update:model-value="handleChange"
        >
          <NumberFieldContent>
            <NumberFieldDecrement />
            <FormControl>
              <NumberFieldInput
                :placeholder="`${TEST_GENERATION_QUESTION_OPTIONS_MIN} - ${TEST_GENERATION_QUESTION_OPTIONS_MAX}`"
              />
            </FormControl>
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="deep">
      <FormItem
        class="flex flex-row items-center justify-between rounded-md border p-4"
      >
        <div class="flex w-5/6 flex-col gap-y-1.5">
          <FormLabel>{{ $t('generate.deep.title') }}</FormLabel>
          <FormDescription>
            {{ $t('generate.deep.description') }}
          </FormDescription>
        </div>
        <FormControl>
          <Switch :checked="value" @update:checked="handleChange" />
        </FormControl>
      </FormItem>
    </FormField>
  </div>
</template>
