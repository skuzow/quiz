<script lang="ts" setup>
import { SelectTrigger } from 'radix-vue';
import { FilterIcon } from 'lucide-vue-next';

import { TestCategoryValues } from '#shared/constants/test.constant';
</script>

<template>
  <FormField v-slot="{ componentField, value }" name="filter">
    <FormItem>
      <Select v-bind="componentField">
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
