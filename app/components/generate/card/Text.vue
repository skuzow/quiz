<script lang="ts" setup>
const {
  isLoadingWithText,
  internalServerErrorWithText,
  isFieldDirty,
  setFieldValue,
  generateWithText
} = useGenerateWithText();

const { FormInput } = useFormMessage();
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
          <FormField
            v-slot="{ value }"
            :name="FormInput.QUESTIONS"
            :validate-on-blur="!isFieldDirty"
          >
            <FormItem v-auto-animate>
              <FormLabel>{{ $t('form.questions') }}</FormLabel>
              <NumberField
                :default-value="5"
                :min="1"
                :max="10"
                :model-value="value"
                @update:model-value="
                  (value: number) => {
                    if (value) setFieldValue(FormInput.QUESTIONS, value);
                    else setFieldValue(FormInput.QUESTIONS, undefined);
                  }
                "
              >
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <FormControl>
                    <NumberFieldInput />
                  </FormControl>
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              <FormMessage />
            </FormItem>
          </FormField>

          <CommonErrorMessage v-if="internalServerErrorWithText">
            {{ $t('error.internalServer') }}
          </CommonErrorMessage>
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
