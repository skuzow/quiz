<script lang="ts" setup>
definePageMeta({ middleware: ['auth'] });

const { t: $t } = useI18n();

seoMeta({
  title: $t('create.title'),
  description: $t('create.description')
});

const createStore = useCreateStore();
</script>

<template>
  <div>
    <h1 class="text-8xl">create</h1>

    <div v-if="createStore.createTestValue">
      <h2>{{ createStore.createTestValue.title }}</h2>
      <p class="mb-10">{{ createStore.createTestValue.description }}</p>

      <ul>
        <li
          v-for="(question, index) in createStore.createTestValue.questions"
          :key="index"
          class="mb-6"
        >
          <h3 class="mb-2">
            {{ index + 1 }}.
            <span class="font-bold">{{ question.type }}</span> :
            {{ question.text }}
          </h3>

          <ul>
            <li v-for="(answer, index2) in question.options" :key="index2">
              <p>
                {{ answer.text }} :
                <span
                  :class="answer.isCorrect ? 'text-green-500' : 'text-red-500'"
                >
                  {{ answer.isCorrect }}
                </span>
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
