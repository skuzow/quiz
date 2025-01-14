<template>
  <Tabs default-value="file">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="file">{{ $t('createai.file.tab') }}</TabsTrigger>
      <TabsTrigger value="text">{{ $t('createai.text.tab') }}</TabsTrigger>
    </TabsList>

    <TabsContent value="file">
      <CreateAiCardFile />
    </TabsContent>

    <TabsContent value="text">
      <CreateAiCardText />
    </TabsContent>
  </Tabs>
</template>
