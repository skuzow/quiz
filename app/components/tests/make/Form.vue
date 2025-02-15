<script lang="ts" setup>
interface Props {
  questions: IUserTestQuestion[];
}

const { questions } = defineProps<Props>();

const {
  isLoadingMake,
  makeCorrection,
  errorBag,
  isFieldTouched,
  makeTest,
  retryTest
} = useMake(questions);
</script>

<template>
  <form v-if="!makeCorrection" class="flex flex-col gap-y-8" @submit="makeTest">
    <ol class="flex flex-col gap-y-8">
      <li v-for="(question, index) in questions" :key="index">
        <TestsMakeQuestionForm :question="question" />
      </li>
    </ol>

    <CommonErrorBagMessages
      v-if="isFieldTouched('questions')"
      :error-bag="errorBag"
      error-key="questions"
    />

    <Button type="submit" class="md:w-fit">
      <IconLoader v-if="isLoadingMake" class="mr-2 fill-primary-foreground" />
      {{ $t('tests.make.correct') }}
    </Button>
  </form>

  <TestsMakeCorrection v-else :correction="makeCorrection" @retry="retryTest" />
</template>
