<script lang="ts" setup>
import { FormInput } from '@/constants/form.constant';

const {
  isLoadingWithText,
  internalServerErrorWithText,
  isFieldDirty,
  generateWithText
} = useGenerateWithText();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('generate.text.title') }}</CardTitle>
      <CardDescription>
        {{ $t('generate.text.description') }}
      </CardDescription>
    </CardHeader>

    <form @submit="generateWithText">
      <CardContent class="flex flex-col gap-y-6">
        <FormField
          v-slot="{ componentField }"
          :name="FormInput.TEXT"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormControl>
              <Textarea
                :placeholder="$t('generate.text.input')"
                v-bind="componentField"
                class="h-40"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex flex-col gap-y-2">
          <GenerateCardFormFields :is-field-dirty="isFieldDirty" />

          <FormErrorMessage v-if="internalServerErrorWithText">
            {{ $t('error.internalServer') }}
          </FormErrorMessage>
        </div>
      </CardContent>

      <CardFooter>
        <Button type="submit" class="w-full">
          <IconLoader
            v-if="isLoadingWithText"
            class="fill-primary-foreground"
          />
          <template v-else>{{ $t('generate.button') }}</template>
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
