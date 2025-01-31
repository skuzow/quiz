<script lang="ts" setup>
import { Trash2Icon, ImageUpIcon } from 'lucide-vue-next';

definePageMeta({ middleware: ['auth'] });

const { t: $t } = useI18n();

seoMeta({
  title: $t('create.title'),
  description: $t('create.description')
});

const { user, userURL } = useAuth();
</script>

<template>
  <div class="flex flex-col items-center gap-y-6">
    <CommonTopImage src="/images/test-image.avif" alt="Test image">
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
  </div>
</template>
