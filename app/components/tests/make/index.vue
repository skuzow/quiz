<script lang="ts" setup>
import { ChartAreaIcon, FilePenIcon } from 'lucide-vue-next';

interface Props {
  test: UserTest;
}

const { test } = defineProps<Props>();

seoMeta({
  title: test.title,
  description: test.description,
  image: test.image
});

const localePath = useLocalePath();

const { authUser, isAuthenticated } = useAuth();

const isLoadingStats: Ref<boolean> = ref(false);
const isLoadingEdit: Ref<boolean> = ref(false);

const statsTest = async () => {
  isLoadingStats.value = true;

  await navigateTo(localePath(`/tests/${test.id}/stats`));

  isLoadingStats.value = false;
};

const editTest = async () => {
  isLoadingEdit.value = true;

  await navigateTo(localePath(`/tests/${test.id}/edit`));

  isLoadingEdit.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <div class="flex flex-col gap-y-6">
      <CommonTopImage :src="test.image || '/images/test.avif'" alt="Test image">
        <NuxtLinkLocale
          :to="`/users/${test.author.username || `id/${test.author.id}`}`"
          :title="`${$t('nav.header.user.profile')} ${test.author.name}`"
          class="absolute left-2 top-2"
        >
          <CommonAvatar
            size="sm"
            :width="40"
            :height="40"
            loading="eager"
            :user="test.author"
          />
        </NuxtLinkLocale>

        <TestsCategories
          v-if="test.categories.length"
          :categories="test.categories"
          class="absolute bottom-2 left-2"
        />

        <div
          v-if="isAuthenticated && authUser?.id === test.author.id"
          class="absolute bottom-2 right-2 flex flex-col gap-2 sm:flex-row"
        >
          <Button variant="secondary" class="gap-x-2" @click="statsTest">
            <IconLoader v-if="isLoadingStats" />
            <ChartAreaIcon v-else :size="16" />
            {{ $t('tests.make.stats') }}
          </Button>

          <Button class="gap-x-2" @click="editTest">
            <IconLoader v-if="isLoadingEdit" class="fill-primary-foreground" />
            <FilePenIcon v-else :size="16" />
            {{ $t('tests.make.edit') }}
          </Button>
        </div>
      </CommonTopImage>

      <TestsInfo :test="test" />
    </div>

    <section>
      <TestsMakeForm :test="test" />
    </section>
  </div>
</template>
