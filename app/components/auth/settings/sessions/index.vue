<template>
  <section>
    <Accordion type="single" collapsible>
      <AccordionItem value="sessions">
        <AccordionTrigger>
          <h3 class="font-bold">
            {{ $t('auth.settings.sessions.title') }}
          </h3>
        </AccordionTrigger>
        <AccordionContent class="pl-2.5">
          <AuthSettingsSessionsContent />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>
