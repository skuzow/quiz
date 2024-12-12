<script lang="ts" setup></script>

<template>
  <Tabs default-value="file">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="file">{{ $t('createai.file.tab') }}</TabsTrigger>
      <TabsTrigger value="text">{{ $t('createai.text.tab') }}</TabsTrigger>
    </TabsList>
    <TabsContent value="file">
      <Card>
        <CardHeader>
          <CardTitle>{{ $t('createai.file.title') }}</CardTitle>
          <CardDescription>
            {{ $t('createai.file.description') }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            class="flex h-40 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground"
          >
            {{ $t('createai.file.input') }}
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full">{{ $t('createai.generate') }}</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="text">
      <Card>
        <CardHeader>
          <CardTitle>{{ $t('createai.text.title') }}</CardTitle>
          <CardDescription>
            {{ $t('createai.text.description') }}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            class="h-40 w-full"
            :placeholder="$t('createai.text.input')"
          />
        </CardContent>
        <CardFooter>
          <Button class="w-full">{{ $t('createai.generate') }}</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
</template>
