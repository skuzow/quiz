<script lang="ts" setup>
const {
  isLoadingWithText,
  textAreaValue,
  questionsValue,
  errorMessageWithText,
  internalServerErrorWithText,
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
        <div class="flex flex-col gap-y-2">
          <Textarea
            v-model="textAreaValue"
            :placeholder="$t('generate.text.input')"
            class="h-40 w-full"
          />

          <CommonErrorMessage v-if="errorMessageWithText.text">
            {{ errorMessageWithText.text }}
          </CommonErrorMessage>
        </div>

        <div class="flex flex-col gap-y-2">
          <NumberField
            id="text-questions"
            v-model="questionsValue"
            :default-value="5"
            :min="1"
            :max="10"
          >
            <Label for="text-questions">{{ $t('form.questions') }}</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>

          <CommonErrorMessage v-if="errorMessageWithText.questions">
            {{ errorMessageWithText.questions }}
          </CommonErrorMessage>

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
