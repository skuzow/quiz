<template>
  <section>
    <Accordion type="single" collapsible>
      <AccordionItem value="account-list">
        <AccordionTrigger>
          <h3 class="font-bold">
            {{ $t('auth.settings.account.linked.title') }}
          </h3>
        </AccordionTrigger>
        <AccordionContent class="pl-2.5">
          <AuthSettingsAccountLinkedContent />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>
