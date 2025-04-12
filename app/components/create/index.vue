<script lang="ts" setup>
import { Trash2Icon, ImageUpIcon } from 'lucide-vue-next';

import { FormInput } from '@/constants/form.constant';

interface Props {
  edit?: boolean;
}

const { edit } = defineProps<Props>();

const { authUser, authUserURL } = useAuth();

const {
  isLoadingCreate,
  internalServerErrorCreate,
  isLoadingDelete,
  image,
  initialIncorrectOptionValue,
  initialSingleQuestionValue,
  errorBag,
  isFieldDirty,
  questions,
  options,
  questionPath,
  optionPath,
  createTest,
  deleteTest,
  clickImageInput,
  updateImageInput
} = useCreate(edit);

const { exampleMessage } = useFormMessage();
</script>

<template>
  <form class="flex flex-col gap-y-6" @submit="createTest">
    <CommonTopImage :key="image" :src="image" alt="Test image">
      <input
        ref="test-image-input"
        type="file"
        accept="image/*"
        class="hidden"
        @change="updateImageInput"
      />

      <NuxtLink
        :to="authUserURL"
        :title="$t('nav.header.user.profile')"
        class="absolute left-2 top-2"
      >
        <CommonAvatar
          size="sm"
          :width="40"
          :height="40"
          loading="lazy"
          :user="authUser"
        />
      </NuxtLink>

      <Button
        size="icon"
        variant="destructive"
        class="absolute right-2 top-2"
        @click.prevent="deleteTest"
      >
        <IconLoader v-if="isLoadingDelete" />
        <Trash2Icon v-else :size="16" />
        <span class="sr-only">
          {{ edit ? 'Delete test' : 'Delete test creation' }}
        </span>
      </Button>

      <Button
        class="absolute bottom-2 right-2 gap-x-1"
        @click.prevent="clickImageInput"
      >
        <ImageUpIcon :size="16" />
        {{ $t('create.form.uploadImage') }}
      </Button>
    </CommonTopImage>

    <section class="flex w-full flex-col gap-y-8">
      <div class="flex flex-col gap-y-6">
        <FormField v-slot="{ value, handleChange }" :name="FormInput.PUBLISHED">
          <FormItem>
            <div class="flex items-center gap-x-3 space-y-0">
              <FormControl>
                <Switch :checked="value" @update:checked="handleChange" />
              </FormControl>
              <FormLabel>{{ $t('form.published') }}</FormLabel>
            </div>
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          :name="FormInput.TITLE"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel>{{ $t('form.title') }}<FormRequired /></FormLabel>
            <FormControl>
              <Input
                type="text"
                :placeholder="exampleMessage(FormInput.TITLE)"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          :name="FormInput.DESCRIPTION"
          :validate-on-blur="!isFieldDirty"
        >
          <FormItem v-auto-animate>
            <FormLabel>{{ $t('form.description') }}<FormRequired /></FormLabel>
            <FormControl>
              <Textarea
                type="text"
                :placeholder="exampleMessage(FormInput.DESCRIPTION)"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <CreateFormCategories />
      </div>

      <ol v-auto-animate class="flex flex-col gap-y-8">
        <li
          v-for="(questionField, indexQuestion) in questions.fields.value"
          :key="`question-${indexQuestion}`"
          class="flex flex-col gap-y-6"
        >
          <CreateFormQuestion
            :field="questionField"
            :index="indexQuestion"
            :path="questionPath(indexQuestion)"
            :is-field-dirty="isFieldDirty"
            :question="questions"
          />

          <ol
            v-if="options[indexQuestion]!.fields.value.length !== 0"
            v-auto-animate
            class="flex flex-col gap-y-4"
          >
            <li
              v-for="(_optionField, indexOption) in options[indexQuestion]!
                .fields.value"
              :key="`question-${indexQuestion}-option-${indexOption}`"
            >
              <CreateFormOption
                :question-field="questionField"
                :index="indexOption"
                :path="optionPath(indexQuestion, indexOption)"
                :is-field-dirty="isFieldDirty"
                :option="options[indexQuestion]!"
              />
            </li>
          </ol>

          <FormErrorBagMessages
            :error-bag="errorBag"
            :error-key="`questions[${indexQuestion}].options`"
          />

          <FormErrorBagMessages
            :error-bag="errorBag"
            :error-key="`questions[${indexQuestion}]`"
          />

          <div class="flex gap-x-2">
            <Button
              class="w-fit"
              variant="secondary"
              @click.prevent="
                options[indexQuestion]!.push(initialIncorrectOptionValue)
              "
            >
              {{ $t('create.form.addOption') }}
            </Button>

            <CreateFormType :path="questionPath(indexQuestion)" />
          </div>
        </li>
      </ol>

      <FormErrorBagMessages :error-bag="errorBag" error-key="questions" />

      <FormErrorMessage v-if="internalServerErrorCreate">
        {{ $t('error.internalServer') }}
      </FormErrorMessage>

      <div class="flex gap-x-2">
        <Button
          variant="secondary"
          @click.prevent="questions.push(initialSingleQuestionValue)"
        >
          {{ $t('create.form.addQuestion') }}
        </Button>

        <Button type="submit">
          <IconLoader
            v-if="isLoadingCreate"
            class="mr-2 fill-primary-foreground"
          />
          {{ edit ? $t('edit.title') : $t('create.form.create') }}
        </Button>
      </div>
    </section>
  </form>
</template>
