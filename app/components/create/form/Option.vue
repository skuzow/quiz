<script lang="ts" setup>
import type { FieldEntry, FieldArrayContext } from 'vee-validate';
import { Trash2Icon } from 'lucide-vue-next';

import { TestQuestionType } from '#shared/constants/test';

interface Props {
  questionField: FieldEntry;
  index: number;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isFieldDirty: any;
  option: FieldArrayContext;
}

const { index, path, isFieldDirty, option } = defineProps<Props>();

const { FormInput, exampleMessage } = useFormMessage();
</script>

<template>
  <FormField
    v-slot="{ componentField: componentFieldOption }"
    :name="`${path}.text`"
    :validate-on-blur="!isFieldDirty"
  >
    <FormItem v-auto-animate>
      <FormLabel>
        <CommonGradientText>{{ index + 1 }}.</CommonGradientText>
        {{ $t('form.option') }}
      </FormLabel>
      <div class="flex gap-x-2">
        <FormField
          v-slot="{ value, handleChange }"
          type="checkbox"
          :name="`${path}.isCorrect`"
        >
          <FormItem class="h-9">
            <FormControl>
              <Checkbox
                :checked="value"
                class="h-9 w-9 border-input"
                :class="{
                  'rounded-full':
                    questionField.value?.type === TestQuestionType.SINGLE
                }"
                @update:checked="handleChange"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormControl>
          <Input
            type="text"
            :placeholder="exampleMessage(FormInput.OPTION, index + 1)"
            v-bind="componentFieldOption"
          />
        </FormControl>

        <Button
          size="icon"
          variant="secondary"
          class="shrink-0"
          @click.prevent="option.remove(index)"
        >
          <Trash2Icon :size="16" />
          <span class="sr-only">Delete test option {{ index + 1 }}</span>
        </Button>
      </div>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
