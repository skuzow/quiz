<script lang="ts" setup>
import { FormInput } from '@/constants/form.constant';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isFieldDirty: any;
}

const { isFieldDirty } = defineProps<Props>();

const emit = defineEmits(['search-enter', 'unselect-sort', 'unselect-filter']);
</script>

<template>
  <form class="flex gap-x-2">
    <FormField
      v-slot="{ componentField }"
      :name="FormInput.SEARCH"
      :validate-on-blur="!isFieldDirty"
    >
      <FormItem v-auto-animate class="w-full">
        <FormControl>
          <Input
            type="text"
            :placeholder="$t('tests.search.placeholder')"
            v-bind="componentField"
            @keydown.enter.prevent="emit('search-enter')"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <TestsFeedFormSort @unselect="emit('unselect-sort')" />

    <TestsFeedFormFilter @unselect="emit('unselect-filter')" />
  </form>
</template>
