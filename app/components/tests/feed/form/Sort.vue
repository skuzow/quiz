<script lang="ts" setup>
import { SelectTrigger } from 'radix-vue';
import {
  ArrowDownUpIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowUp10Icon,
  ArrowDown01Icon,
  ArrowUpWideNarrowIcon,
  ArrowDownNarrowWideIcon
} from 'lucide-vue-next';

import { TestOrder, TestOrderValues } from '#shared/constants/test.constant';
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
                <ArrowUpIcon v-if="order === TestOrder.NEWEST" :size="16" />
                <ArrowDownIcon
                  v-else-if="order === TestOrder.OLDEST"
                  :size="16"
                />
                <ArrowUp10Icon
                  v-else-if="order === TestOrder.MOSTPOPULAR"
                  :size="16"
                />
                <ArrowDown01Icon
                  v-else-if="order === TestOrder.LEASTPOPULAR"
                  :size="16"
                />
                <ArrowUpWideNarrowIcon
                  v-else-if="order === TestOrder.LONGEST"
                  :size="16"
                />
                <ArrowDownNarrowWideIcon
                  v-else-if="order === TestOrder.SHORTEST"
                  :size="16"
                />

                {{ $t(`order.${order.toLowerCase()}`) }}
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>
  </FormField>
</template>
