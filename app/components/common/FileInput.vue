<script lang="ts" setup>
import { XIcon, CloudUploadIcon } from 'lucide-vue-next';

import type { PreviewFile } from '@/types/file.type';
import type { FileExtensions, FileTypes } from '@/constants/file.constant';

interface Props {
  accept: FileExtensions[];
  types: FileTypes[];
}

const { accept, types } = defineProps<Props>();

const id: string = useId();

const active: Ref<boolean> = ref(false);
const filePreview: Ref<PreviewFile | null> = ref(null);
const invalidFileType: Ref<boolean> = ref(false);

const emit = defineEmits(['change']);

const onDrop = (e: DragEvent) => {
  const files = e.dataTransfer?.files;

  if (!files) return;

  onFileChange(files);
};

const onChange = (e: Event) => {
  const files = (e.target as HTMLInputElement).files;

  if (!files) return;

  onFileChange(files);
};

const onFileChange = (files: FileList) => {
  const fileList = Array.from(files);

  const file: File = fileList[0]!;

  invalidFileType.value = false;

  if (!types.includes(file.type as FileTypes)) {
    invalidFileType.value = true;
    active.value = false;

    return;
  }

  readFile(file);
};

const readFile = (file: File) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onloadend = () => {
    filePreview.value = {
      file,
      name: file.name,
      path: reader.result as string
    };

    active.value = true;

    emit('change', filePreview.value);
  };
};

const resetFile = () => {
  filePreview.value = null;
  active.value = false;

  emit('change', null);

  resetFileInput();
};

const resetFileInput = () => {
  const fileInput = document.getElementById(id) as HTMLInputElement;

  fileInput.value = '';
};
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <div
      class="relative flex h-40 w-full items-center justify-center rounded-md border border-dashed text-sm transition-colors"
      :class="{ 'border-primary': active }"
      @dragover.prevent.stop="active = true"
      @dragleave.prevent.stop="active = false"
      @drop.prevent="onDrop"
    >
      <template v-if="filePreview">
        <XIcon
          :size="20"
          class="absolute right-2 top-2 z-10 cursor-pointer"
          @click="resetFile"
        />

        <div class="flex flex-col items-center gap-y-2 font-medium">
          <slot />
          <span>{{ filePreview.name }}</span>
        </div>
      </template>

      <div
        v-else
        class="flex flex-col items-center gap-y-2 font-medium"
        :class="{ 'text-muted-foreground': !active }"
      >
        <CloudUploadIcon :size="50" />

        <span v-if="active">{{ $t('file.drag') }}</span>
        <span v-else>{{ $t('file.upload') }}</span>
      </div>

      <input
        :id="id"
        type="file"
        :accept="accept.join(',')"
        class="absolute h-full w-full cursor-pointer opacity-0"
        @change="onChange"
      />
    </div>

    <CommonErrorMessage v-if="invalidFileType">
      {{ $t('file.invalidType') }}
    </CommonErrorMessage>
  </div>
</template>
