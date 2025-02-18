<template>
  <Tabs default-value="file">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="file">{{ $t('createai.file.tab') }}</TabsTrigger>
      <TabsTrigger value="text">{{ $t('createai.text.tab') }}</TabsTrigger>
    </TabsList>

    <TabsContent value="file">
      <GenerateCardFile />
    </TabsContent>

    <TabsContent value="text">
      <GenerateCardText />
    </TabsContent>
  </Tabs>
</template>
