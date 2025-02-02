<script lang="ts" setup>
interface Props {
  questions: IUserTestQuestion[];
}

const { questions } = defineProps<Props>();

const { isLoadingMake, makeTest } = useMake(questions);
</script>

<template>
  <form class="flex flex-col gap-y-8" @submit="makeTest">
    <ol class="flex flex-col gap-y-8">
      <li v-for="(question, index) in questions" :key="index">
        <TestsMakeQuestion :question="question" />
      </li>
    </ol>

    <Button type="submit" class="w-fit">
      <IconLoader v-if="isLoadingMake" class="mr-2 fill-primary-foreground" />
      {{ $t('tests.make.correct') }}
    </Button>
  </form>
</template>
