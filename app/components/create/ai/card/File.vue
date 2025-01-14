<script lang="ts" setup>
import { FileSearchIcon } from 'lucide-vue-next';

import { FILE_EXTENSIONS, FILE_TYPES } from '@/constants/file';

const {
  isLoadingWithFile,
  requiredFileError,
  onFileChange,
  questionsValue,
  errorMessageWithFile,
  internalServerErrorWithFile,
  generateWithFile
} = useCreateAiWithFile();

const { FormInput, requiredMessage } = useFormMessage();

const accept: FILE_EXTENSIONS[] = [
  FILE_EXTENSIONS.PDF,
  FILE_EXTENSIONS.DOCX,
  FILE_EXTENSIONS.TXT
];

const types: FILE_TYPES[] = [FILE_TYPES.PDF, FILE_TYPES.DOCX, FILE_TYPES.TXT];
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('createai.file.title') }}</CardTitle>
      <CardDescription>
        {{ $t('createai.file.description') }} {{ accept.join(', ') }}
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
          <NumberField
            id="text-questions"
            v-model="questionsValue as number"
            :default-value="5"
            :min="1"
            :max="10"
          >
            <Label for="text-questions">{{ $t('form.questions') }}</Label>
            <NumberFieldContent>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldContent>
          </NumberField>

          <CommonErrorMessage v-if="errorMessageWithFile.questions">
            {{ errorMessageWithFile.questions }}
          </CommonErrorMessage>

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
          <template v-else>{{ $t('createai.generate') }}</template>
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>
