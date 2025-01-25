<script lang="ts" setup>
import type { FieldArrayContext } from 'vee-validate';
import { Trash2Icon } from 'lucide-vue-next';

interface Props {
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
    <FormItem>
      <FormLabel>
        <CommonGradientText>{{ index + 1 }}.</CommonGradientText>
        {{ $t('form.option') }}
      </FormLabel>
      <FormControl>
        <div class="flex gap-x-2">
          <FormField
            v-slot="{ handleChange }"
            type="checkbox"
            :name="`${path}.isCorrect`"
          >
            <FormItem class="h-9">
              <FormControl>
                <Checkbox class="h-9 w-9" @update:checked="handleChange" />
              </FormControl>
            </FormItem>
          </FormField>

          <Input
            type="text"
            :placeholder="exampleMessage(FormInput.OPTION, index + 1)"
            v-bind="componentFieldOption"
          />

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
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
