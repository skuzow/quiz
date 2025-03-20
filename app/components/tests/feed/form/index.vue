<script lang="ts" setup>
import { SelectTrigger } from 'radix-vue';
import {
  ArrowDownUpIcon,
  FilterIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowUp10Icon,
  ArrowDown01Icon,
  ArrowUpWideNarrowIcon,
  ArrowDownNarrowWideIcon
} from 'lucide-vue-next';

import {
  TestOrder,
  TestOrderValues,
  TestCategoryValues
} from '#shared/constants/test.constant';

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
  </form>
</template>
