<script lang="ts" setup>
import type { FieldArrayContext, FieldEntry } from 'vee-validate';
import { ChevronUpIcon, ChevronDownIcon, Trash2Icon } from 'lucide-vue-next';

interface Props {
  field: FieldEntry;
  index: number;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isFieldDirty: any;
  question: FieldArrayContext;
}

const { field, index, path, isFieldDirty, question } = defineProps<Props>();

const { FormInput, exampleMessage } = useFormMessage();
</script>

<template>
  <FormField
    v-slot="{ componentField }"
    :name="`${path}.text`"
    :validate-on-blur="!isFieldDirty"
  >
    <FormItem>
      <FormLabel>
        <CommonGradientText>{{ index + 1 }}.</CommonGradientText>
        {{ $t('form.question') }}
      </FormLabel>
      <FormControl>
        <div class="flex gap-x-2">
          <Input
            type="text"
            :placeholder="exampleMessage(FormInput.QUESTION, index + 1)"
            v-bind="componentField"
          />

          <Button
            v-if="!field.isFirst"
            size="icon"
            variant="secondary"
            class="w-10"
            @click.prevent="question.swap(index, index - 1)"
          >
            <ChevronUpIcon :size="16" />
            <span class="sr-only">Swap Up test question {{ index + 1 }}</span>
          </Button>

          <Button
            v-if="!field.isLast"
            size="icon"
            variant="secondary"
            class="w-10"
            @click.prevent="question.swap(index, index + 1)"
          >
            <ChevronDownIcon :size="16" />
            <span class="sr-only">Swap Down test question {{ index + 1 }}</span>
          </Button>

          <Button
            size="icon"
            variant="secondary"
            class="w-10"
            @click.prevent="question.remove(index)"
          >
            <Trash2Icon :size="16" />
            <span class="sr-only">Delete test question {{ index + 1 }}</span>
          </Button>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
