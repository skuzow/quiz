<script lang="ts" setup>
import { FileSearchIcon } from 'lucide-vue-next';

import { FileExtensions, FileTypes } from '@/constants/file.constant';

const {
  isLoadingWithFile,
  requiredFileError,
  onFileChange,
  internalServerErrorWithFile,
  isFieldDirty,
  generateWithFile
} = useGenerateWithFile();

const { FormInput, requiredMessage } = useFormMessage();

const accept: FileExtensions[] = [
  FileExtensions.PDF,
  FileExtensions.DOCX,
  FileExtensions.TXT
];

const types: FileTypes[] = [FileTypes.PDF, FileTypes.DOCX, FileTypes.TXT];
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('generate.file.title') }}</CardTitle>
      <CardDescription>
        {{ $t('generate.file.description') }} {{ accept.join(', ') }}
      </CardDescription>
    </CardHeader>

    <form @submit="generateWithFile">
      <CardContent class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          <CommonFileInput
            :accept="accept"
            :types="types"
            @change="onFileChange"
          >
            <FileSearchIcon :size="50" />
          </CommonFileInput>

          <CommonErrorMessage v-if="requiredFileError">
            {{ requiredMessage(FormInput.FILE) }}
          </CommonErrorMessage>
        </div>

        <div class="flex flex-col gap-y-2">
          <GenerateCardFields :is-field-dirty="isFieldDirty" />

          <CommonErrorMessage v-if="internalServerErrorWithFile">
            {{ $t('error.internalServer') }}
          </CommonErrorMessage>
        </div>
      </CardContent>

      <CardFooter>
        <Button type="submit" class="w-full">
          <IconLoader
            v-if="isLoadingWithFile"
            class="fill-primary-foreground"
          />
          <template v-else>{{ $t('generate.button') }}</template>
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
