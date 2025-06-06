<script lang="ts" setup>
import { useField } from 'vee-validate';
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

const route = useRoute();

const { setValue } = useField<TestOrder | undefined>('sort');

const prevValue: Ref<TestOrder | undefined> = ref(
  (route.query.sort as TestOrder) || undefined
);

const sortIconMap: Record<TestOrder, LucideIcon> = {
  [TestOrder.NEWEST]: ArrowUpIcon,
  [TestOrder.OLDEST]: ArrowDownIcon,
  [TestOrder.MOSTPOPULAR]: ArrowUp10Icon,
  [TestOrder.LEASTPOPULAR]: ArrowDown01Icon,
  [TestOrder.LONGEST]: ArrowUpWideNarrowIcon,
  [TestOrder.SHORTEST]: ArrowDownNarrowWideIcon
};

const handleUnselectValue = (currentValue: TestOrder) => {
  if (currentValue === prevValue.value) {
    setValue(undefined);

    prevValue.value = undefined;
  } else prevValue.value = currentValue;
};
</script>

<template>
  <FormField v-slot="{ componentField, value }" name="sort">
    <FormItem>
      <Select
        v-bind="componentField"
        @update:model-value="
          // TODO: fix bug when not route value and unselect value doesn't trigger this update
          (currentValue) => handleUnselectValue(currentValue as TestOrder)
        "
      >
        <FormControl>
          <SelectTrigger as-child>
            <TestsFeedFormButton
              variant="outline"
              :text="
                value ? $t(`order.${value}`) : $t('tests.search.buttons.sort')
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

                {{ $t(`order.${order}`) }}
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </FormItem>
  </FormField>
</template>
