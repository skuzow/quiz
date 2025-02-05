<script lang="ts" setup>
import { FilePenIcon } from 'lucide-vue-next';

interface Props {
  test: IUserTest;
}

const { test } = defineProps<Props>();

seoMeta({
  title: test.title,
  description: test.description
});

const localePath = useLocalePath();

const { isAuthenticated, user: authUser } = useAuth();

const tempCategories = ['Education', 'Science'];
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <div class="flex flex-col gap-y-6">
      <CommonTopImage src="/images/test-image.avif" alt="Test image">
        <NuxtLink
          :to="localePath(`/users/${test.author.username || test.author.id}`)"
          :title="`${$t('nav.header.user.profile')} ${test.author.name}`"
          class="absolute left-2 top-2"
        >
          <CommonAvatar
            size="sm"
            :height="40"
            :width="40"
            loading="lazy"
            :user="test.author as IUserPartial"
          />
        </NuxtLink>

        <ul class="absolute bottom-2 left-2 flex gap-x-2">
          <li v-for="(category, index) in tempCategories" :key="index">
            <Badge>{{ category }}</Badge>
          </li>
        </ul>

        <Button
          v-if="isAuthenticated && authUser?.id === test.author.id"
          class="absolute bottom-2 right-2 gap-x-1"
        >
          <FilePenIcon :size="16" />
          {{ $t('tests.make.edit') }}
        </Button>
      </CommonTopImage>

      <div class="flex flex-col gap-y-2">
        <h1 class="overflow-hidden text-ellipsis text-2xl font-bold">
          <CommonGradientText class="bg-gradient-to-b">
            {{ test.title }}
          </CommonGradientText>
        </h1>

        <p class="overflow-hidden text-ellipsis">{{ test.description }}</p>
      </div>
    </div>

    <section>
      <TestsMakeForm :questions="test.questions" />
    </section>
  </div>
</template>
