<script lang="ts" setup>
interface Props {
  errorBag: Partial<Record<string, string[]>>;
  errorKey: string;
}

const { errorBag, errorKey } = defineProps<Props>();
</script>

<template>
  <FormErrorMessage
    v-if="errorBag.hasOwnProperty(errorKey) && errorBag[errorKey]?.length !== 0"
  >
    <ul v-auto-animate>
      <li
        v-for="(error, indexError) in errorBag[errorKey]"
        :key="`error-${errorKey}-${indexError}`"
      >
        {{ error }}
      </li>
    </ul>
  </FormErrorMessage>
</template>
