<script lang="ts" setup></script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ $t('createai.file.title') }}</CardTitle>
      <CardDescription>
        {{ $t('createai.file.description') }}
      </CardDescription>
    </CardHeader>

    <CardContent class="flex flex-col gap-y-6">
      <div
        class="flex h-40 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground"
      >
        {{ $t('createai.file.input') }}
      </div>

      <NumberField :default-value="5" :min="1" :max="10">
        <Label>{{ $t('form.questions') }}</Label>
        <NumberFieldContent>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldContent>
      </NumberField>
    </CardContent>

    <CardFooter>
      <Button class="w-full">{{ $t('createai.generate') }}</Button>
    </CardFooter>
  </Card>
</template>
