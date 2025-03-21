<script lang="ts" setup>
import { SelectTrigger } from 'radix-vue';
import { FilterIcon } from 'lucide-vue-next';

import {
  TestCategoryValues,
  type TestCategory
} from '#shared/constants/test.constant';

const emit = defineEmits(['unselect']);

const route = useRoute();

const prevValue: Ref<TestCategory | undefined> = ref(
  ((route.query.filter as string)?.toUpperCase() as TestCategory) || undefined
);

const handleUnselectValue = (currentValue: TestCategory | undefined) => {
  if (currentValue === prevValue.value) {
    emit('unselect');

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
                  ? $t(`categories.${value.toLowerCase()}`)
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
              {{ $t(`categories.${category.toLowerCase()}`) }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>
  </FormField>
</template>
