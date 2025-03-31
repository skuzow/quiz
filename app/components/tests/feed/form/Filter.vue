<script lang="ts" setup>
import { useField } from 'vee-validate';
import { SelectTrigger } from 'radix-vue';
import { FilterIcon } from 'lucide-vue-next';

import {
  TestCategoryValues,
  type TestCategory
} from '#shared/constants/test.constant';

const route = useRoute();

const { setValue } = useField<TestCategory | undefined>('filter');

const prevValue: Ref<TestCategory | undefined> = ref(
  (route.query.filter as TestCategory) || undefined
);

const handleUnselectValue = (currentValue: TestCategory) => {
  if (currentValue === prevValue.value) {
    setValue(undefined);

    prevValue.value = undefined;
  } else prevValue.value = currentValue;
};
</script>

<template>
  <FormField v-slot="{ componentField, value }" name="filter">
    <FormItem>
      <Select
        v-bind="componentField"
        @update:model-value="
          // TODO: fix bug when not route value and unselect value doesn't trigger this update
          (currentValue) => handleUnselectValue(currentValue as TestCategory)
        "
      >
        <FormControl>
          <SelectTrigger as-child>
            <TestsFeedFormButton
              variant="secondary"
              :text="
                value
                  ? $t(`categories.${value}`)
                  : $t('tests.search.buttons.filter')
              "
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
              {{ $t(`categories.${category}`) }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>
  </FormField>
</template>
