<script lang="ts" setup>
import { SelectTrigger } from 'radix-vue';
import { ArrowDownUpIcon, FilterIcon } from 'lucide-vue-next';

import { TestCategoryValues } from '#shared/constants/test.constant';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isFieldDirty: any;
}

const { isFieldDirty } = defineProps<Props>();

const emit = defineEmits(['search-enter']);

const { FormInput } = useFormMessage();
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

    <TestsFeedFormButton
      variant="outline"
      :text="$t('tests.search.buttons.sort')"
    >
      <ArrowDownUpIcon :size="16" />
    </TestsFeedFormButton>

    <FormField v-slot="{ componentField }" name="filter">
      <FormItem>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <TestsFeedFormButton
                variant="secondary"
                :text="$t('tests.search.buttons.filter')"
              >
                <FilterIcon :size="16" />
              </TestsFeedFormButton>
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="category in TestCategoryValues"
                :key="category"
                :value="category"
              >
                {{ $t(`categories.${category.toLowerCase()}`) }}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </FormItem>
    </FormField>
  </form>
</template>
