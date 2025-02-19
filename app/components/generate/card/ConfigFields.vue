<script lang="ts" setup>
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isFieldDirty: any;
}

const { isFieldDirty } = defineProps<Props>();

const { FormInput } = useFormMessage();
</script>

<template>
  <div class="flex flex-col gap-y-6">
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
  </div>
</template>
