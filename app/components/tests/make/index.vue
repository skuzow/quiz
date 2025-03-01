<script lang="ts" setup>
import {
  FilePenIcon,
  LockIcon,
  FileQuestionIcon,
  EyeIcon
} from 'lucide-vue-next';

interface Props {
  test: UserTest;
}

const { test } = defineProps<Props>();

seoMeta({
  title: test.title,
  description: test.description
});

const localePath = useLocalePath();

const { authUser, isAuthenticated } = useAuth();

const isLoadingEdit: Ref<boolean> = ref(false);

const editTest = async () => {
  isLoadingEdit.value = true;

  await navigateTo(localePath(`/tests/${test.id}/edit`));

  isLoadingEdit.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <div class="flex flex-col gap-y-6">
      <CommonTopImage src="/images/test.avif" alt="Test image">
        <NuxtLinkLocale
          :to="`/users/${test.author.username || `id/${test.author.id}`}`"
          :title="`${$t('nav.header.user.profile')} ${test.author.name}`"
          class="absolute left-2 top-2"
        >
          <CommonAvatar
            size="sm"
            :height="40"
            :width="40"
            loading="lazy"
            :user="test.author"
          />
        </NuxtLinkLocale>

        <TestsCategories
          v-if="test.categories.length"
          :categories="test.categories"
          class="absolute bottom-2 left-2"
        />

        <Button
          v-if="isAuthenticated && authUser?.id === test.author.id"
          class="absolute bottom-2 right-2 gap-x-2"
          @click="editTest"
        >
          <IconLoader v-if="isLoadingEdit" class="fill-primary-foreground" />
          <FilePenIcon v-else :size="16" />
          {{ $t('tests.make.edit') }}
        </Button>
      </CommonTopImage>

      <div
        class="flex flex-col gap-y-2 lg:flex-row lg:justify-between lg:gap-y-0"
      >
        <div class="flex flex-col gap-y-2">
          <h1 class="overflow-hidden text-ellipsis text-2xl font-bold">
            <CommonGradientText class="bg-gradient-to-b">
              {{ test.title }}
            </CommonGradientText>
          </h1>

          <p class="overflow-hidden text-ellipsis">{{ test.description }}</p>
        </div>

        <ul class="flex gap-x-2 lg:items-start">
          <li v-if="!test.published" class="flex items-center py-1">
            <LockIcon :size="16" />
          </li>

          <li class="flex items-center gap-x-1">
            <FileQuestionIcon :size="16" />
            {{ test.questions.length }}
          </li>

          <li class="flex items-center gap-x-1">
            <EyeIcon :size="16" />
            {{ test.views }}
          </li>
        </ul>
      </div>
    </div>

    <section>
      <TestsMakeForm :questions="test.questions" />
    </section>
  </div>
</template>
