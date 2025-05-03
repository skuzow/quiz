<script lang="ts" setup>
const { t: $t } = useI18n();

interface FaqItem {
  value: string;
  question: string;
  answer: string;
}

const faq: FaqItem[] = [
  {
    value: 'faq-platform',
    question: $t('landing.faq.questions.platform.question'),
    answer: $t('landing.faq.questions.platform.answer')
  },
  {
    value: 'faq-platform-access',
    question: $t('landing.faq.questions.platformAccess.question'),
    answer: $t('landing.faq.questions.platformAccess.answer')
  },
  {
    value: 'faq-create-test',
    question: $t('landing.faq.questions.createTest.question'),
    answer: $t('landing.faq.questions.createTest.answer')
  },
  {
    value: 'faq-question-types',
    question: $t('landing.faq.questions.questionTypes.question'),
    answer: $t('landing.faq.questions.questionTypes.answer')
  },
  {
    value: 'faq-test-stats',
    question: $t('landing.faq.questions.testStats.question'),
    answer: $t('landing.faq.questions.testStats.answer')
  }
];
</script>

<template>
  <section class="flex flex-col items-center">
    <CommonSectionTitle
      :title="$t('landing.faq.title')"
      :description="$t('landing.faq.description')"
    />

    <Accordion type="single" collapsible class="w-full max-w-3xl">
      <AccordionItem
        v-for="{ value, question, answer } in faq"
        :key="value"
        :value="value"
      >
        <AccordionTrigger>
          <h3 class="text-lg font-semibold">{{ question }}</h3>
        </AccordionTrigger>
        <AccordionContent>{{ answer }}</AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>
