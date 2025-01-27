<script lang="ts" setup>
import { Trash2Icon, ImageUpIcon } from 'lucide-vue-next';

definePageMeta({ middleware: ['auth'] });

const { t: $t } = useI18n();

seoMeta({
  title: $t('create.title'),
  description: $t('create.description')
});

const localePath = useLocalePath();

const { user, nameAbbreviation, userURL } = useAuth();
</script>

<template>
  <div class="flex flex-col items-center gap-y-6">
    <CommonTopImage src="/images/test-image.avif" alt="Test image">
      <NuxtLink
        :to="localePath(userURL)"
        :title="$t('nav.header.user.profile')"
        class="absolute left-2 top-2"
      >
        <Avatar size="sm">
          <AvatarImage
            v-if="user?.image"
            :src="user?.image"
            width="40"
            height="40"
            loading="lazy"
            title="Avatar"
            alt="Avatar"
          />
          <AvatarFallback>
            {{ nameAbbreviation }}
          </AvatarFallback>
        </Avatar>
      </NuxtLink>

      <Button size="icon" variant="secondary" class="absolute right-2 top-2">
        <Trash2Icon :size="16" />
        <span class="sr-only">Delete test creation</span>
      </Button>

      <Button class="absolute bottom-2 right-2 gap-x-1">
        <ImageUpIcon :size="16" />
        {{ $t('create.form.uploadImage') }}
      </Button>
    </CommonTopImage>

    <CreateForm />

    <!-- <div v-if="createStore.createTestValue">
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
    </div> -->
  </div>
</template>
