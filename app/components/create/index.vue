<script lang="ts" setup>
import { Trash2Icon, ImageUpIcon } from 'lucide-vue-next';

interface Props {
  edit?: boolean;
}

const { edit } = defineProps<Props>();

const testStore = useTestStore();

const { user, userURL } = useAuth();

const isLoadingDelete: Ref<boolean> = ref(false);

const deleteTest = async () => {
  isLoadingDelete.value = true;

  if (edit) await testStore.deleteTest(testStore.editTest!.id);
  else console.log('Delete test creation'); // TODO: delete test creation

  isLoadingDelete.value = false;

  if (edit) {
    await navigateTo(userURL.value);

    testStore.editTest = undefined;
  }
};
</script>

<template>
  <div class="flex flex-col gap-y-6">
    <CommonTopImage src="/images/test.avif" alt="Test image">
      <NuxtLink
        :to="userURL"
        :title="$t('nav.header.user.profile')"
        class="absolute left-2 top-2"
      >
        <CommonAvatar
          size="sm"
          :height="40"
          :width="40"
          loading="lazy"
          :user="user as IUserPartial"
        />
      </NuxtLink>

      <Button
        size="icon"
        variant="secondary"
        class="absolute right-2 top-2"
        @click="deleteTest"
      >
        <IconLoader v-if="isLoadingDelete" />
        <Trash2Icon v-else :size="16" />
        <span class="sr-only">
          {{ edit ? 'Delete test' : 'Delete test creation' }}
        </span>
      </Button>

      <Button class="absolute bottom-2 right-2 gap-x-1">
        <ImageUpIcon :size="16" />
        {{ $t('create.form.uploadImage') }}
      </Button>
    </CommonTopImage>

    <section>
      <CreateForm :edit="edit" />
    </section>
  </div>
</template>
