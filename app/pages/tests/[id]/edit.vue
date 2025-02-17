<script lang="ts" setup>
definePageMeta({ middleware: 'auth' });

const { t: $t } = useI18n();

seoMeta({
  title: $t('edit.title'),
  description: $t('edit.description')
});

const route = useRoute();

const id = route.params.id as string;

const testStore = useTestStore();

const result = await testStore.getTestById(id);

const { user } = useAuth();

if (user.value?.id !== result.body.test.author.id) {
  const localePath = useLocalePath();

  await navigateTo(localePath(`/tests/${id}`));
}
</script>

<template>
  <div>{{ result }}</div>
</template>
