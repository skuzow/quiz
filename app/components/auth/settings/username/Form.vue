<script lang="ts" setup>
defineEmits(['close-update-username']);

const {
  isLoadingUpdateUsername,
  errorMessageUpdateUsername,
  UpdateUsernameSchema,
  updateUsernameForm,
  fieldConfig,
  updateUsername,
  closeUpdateUsername
} = useAuthUpdateUsername();
</script>

<template>
  <Card>
    <CardContent class="pt-6">
      <AutoForm
        class="flex flex-col gap-y-6"
        :schema="UpdateUsernameSchema"
        :form="updateUsernameForm"
        :field-config="fieldConfig"
        @submit="updateUsername"
      >
        <FormErrorMessage v-if="errorMessageUpdateUsername">
          {{ errorMessageUpdateUsername }}
        </FormErrorMessage>

        <div class="flex justify-end gap-x-2">
          <Button variant="ghost" @click.prevent="closeUpdateUsername">
            {{ $t('cancel') }}
          </Button>

          <Button type="submit">
            <IconLoader
              v-if="isLoadingUpdateUsername"
              class="mr-2 fill-primary-foreground"
            />
            {{ $t('save') }}
          </Button>
        </div>
      </AutoForm>
    </CardContent>
  </Card>
</template>
