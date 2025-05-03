<script lang="ts" setup>
import { TestQuestionTypeValues } from '#shared/constants/test.constant';

interface Props {
  path: string;
}

const { path } = defineProps<Props>();
</script>

<template>
  <FormField v-slot="{ componentField }" :name="`${path}.type`">
    <FormItem>
      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger class="w-28">
            <SelectValue class="mr-2" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="type in TestQuestionTypeValues"
              :key="type"
              :value="type"
            >
              {{ $t(`form.types.${type}`) }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
