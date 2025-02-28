<script lang="ts" setup>
import {
  ComboboxRoot,
  ComboboxAnchor,
  ComboboxTrigger,
  ComboboxPortal,
  ComboboxContent,
  ComboboxItemIndicator,
  TagsInputRoot
} from 'radix-vue';
import { ChevronsUpDownIcon, CheckIcon } from 'lucide-vue-next';

import { TestCategoryValues } from '#shared/constants/test.constant';

const { FormInput } = useFormMessage();
</script>

<template>
  <FormField v-slot="{ value, componentField }" :name="FormInput.CATEGORIES">
    <FormItem v-auto-animate>
      <FormLabel>{{ $t('form.categories') }}</FormLabel>
      <FormControl>
        <ComboboxRoot v-bind="componentField" multiple>
          <ComboboxAnchor>
            <ComboboxTrigger
              class="relative inline-flex w-full items-center justify-between"
            >
              <TagsInputRoot
                delimiter=""
                class="flex min-h-9 w-full flex-wrap items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm"
              >
                <span v-if="!value.length" class="text-muted-foreground">
                  {{ `${$t('form.select')} ${$t('form.categories')}` }}
                </span>

                <TagsInputItem
                  v-for="categoryValue in value"
                  :key="categoryValue"
                  :value="$t(`categories.${categoryValue.toLowerCase()}`)"
                  class="transition-colors"
                >
                  <TagsInputItemText class="text-xs font-semibold" />
                </TagsInputItem>
              </TagsInputRoot>

              <ChevronsUpDownIcon
                :size="16"
                class="absolute right-3 shrink-0 opacity-50"
              />
            </ComboboxTrigger>
          </ComboboxAnchor>

          <ComboboxPortal>
            <ComboboxContent>
              <CommandList
                position="popper"
                class="mt-1 w-[--radix-popper-anchor-width] rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
              >
                <CommandGroup class="flex flex-col gap-y-1">
                  <CommandItem
                    v-for="category in TestCategoryValues"
                    :key="category"
                    :value="category"
                    class="justify-between"
                    :class="{ 'bg-accent': value.includes(category) }"
                  >
                    <span>
                      {{ $t(`categories.${category.toLowerCase()}`) }}
                    </span>

                    <ComboboxItemIndicator
                      class="inline-flex items-center justify-center"
                    >
                      <CheckIcon :size="16" />
                    </ComboboxItemIndicator>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </ComboboxContent>
          </ComboboxPortal>
        </ComboboxRoot>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
