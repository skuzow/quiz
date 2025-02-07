<script lang="ts" setup>
import { CommonErrorBagMessages } from '#components';

interface Props {
  questions: IUserTestQuestion[];
}

const { questions } = defineProps<Props>();

const { isLoadingMake, errorBag, isFieldTouched, makeTest } =
  useMake(questions);
</script>

<template>
  <form class="flex flex-col gap-y-8" @submit="makeTest">
    <ol class="flex flex-col gap-y-8">
      <li v-for="(question, index) in questions" :key="index">
        <TestsMakeQuestion :question="question" />
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
</template>
