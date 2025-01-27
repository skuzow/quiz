<script lang="ts" setup>
interface Props {
  errorBag: Partial<Record<string, string[]>>;
  errorKey: string;
}

const { errorBag, errorKey } = defineProps<Props>();
</script>

<template>
  <CommonErrorMessage
    v-if="errorBag.hasOwnProperty(errorKey) && errorBag[errorKey]?.length !== 0"
  >
    <ul>
      <li v-for="(error, indexError) in errorBag[errorKey]" :key="indexError">
        {{ error }}
      </li>
    </ul>
  </CommonErrorMessage>
</template>
