<script lang="ts" setup>
import { SelectTrigger } from 'radix-vue';
import {
  ArrowDownUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowUp10Icon,
  ArrowDown01Icon,
  ArrowUpWideNarrowIcon,
  ArrowDownNarrowWideIcon,
  type LucideIcon
} from 'lucide-vue-next';

import { TestOrder, TestOrderValues } from '#shared/constants/test.constant';

const sortIconMap: Record<TestOrder, LucideIcon> = {
  [TestOrder.NEWEST]: ArrowUpIcon,
  [TestOrder.OLDEST]: ArrowDownIcon,
  [TestOrder.MOSTPOPULAR]: ArrowUp10Icon,
  [TestOrder.LEASTPOPULAR]: ArrowDown01Icon,
  [TestOrder.LONGEST]: ArrowUpWideNarrowIcon,
  [TestOrder.SHORTEST]: ArrowDownNarrowWideIcon
};
</script>

<template>
  <FormField v-slot="{ componentField, value }" name="sort">
    <FormItem>
      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger as-child>
            <TestsFeedFormButton
              variant="outline"
              :text="
                value
                  ? $t(`order.${value.toLowerCase()}`)
                  : $t('tests.search.buttons.sort')
              "
            >
              <ArrowDownUpIcon :size="16" />
            </TestsFeedFormButton>
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="order in TestOrderValues"
              :key="order"
              :value="order"
            >
              <div class="flex items-center gap-x-2">
                <component :is="sortIconMap[order]" :size="16" />

                {{ $t(`order.${order.toLowerCase()}`) }}
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>
  </FormField>
</template>
