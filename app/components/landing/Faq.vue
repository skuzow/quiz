<script lang="ts" setup>
const faq = [
  {
    value: 'faq-platform',
    question: 'What is this platform for?',
    answer:
      "Our platform helps you create, generate, and share tests easily,whether you're an educator, student, or self-learner. You can build tests manually or use our AI tools for faster generation."
  },
  {
    value: 'faq-platform-access',
    question: 'Do I need an account to use it?',
    answer:
      'No, you can use the platform for making tests without creating an account. However, creating an account allows you to create and generate your own tests and manage them.'
  },
  {
    value: 'faq-create-test',
    question: 'How can I create a test?',
    answer:
      'You can create a test manually using our editor or let AI generate it for you by describing it or uploading a readable file.'
  },
  {
    value: 'faq-question-types',
    question: 'What types of questions are?',
    answer: 'You can create single or multiple-choice questions.'
  }
];
</script>

<template>
  <section class="flex flex-col items-center">
    <LandingSectionTitle
      title="Frequently Asked Questions"
      description="Everything you need to know"
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
