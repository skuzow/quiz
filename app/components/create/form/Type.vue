<script lang="ts" setup>
import { TestQuestionType } from '#shared/constants/test';

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
          <SelectTrigger>
            <SelectValue class="mr-2" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="typeKey in Object.keys(TestQuestionType)"
              :key="typeKey"
              :value="typeKey"
            >
              {{
                $t(
                  `form.types.${TestQuestionType[
                    typeKey as keyof typeof TestQuestionType
                  ].toLowerCase()}`
                )
              }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
