<script lang="ts" setup>
const { authUser } = useAuth();

const isUpdateEmailOpen: Ref<boolean> = ref(false);
</script>

<template>
  <section>
    <Accordion type="single" collapsible>
      <AccordionItem
        value="update-email"
        :class="{ 'border-none': isUpdateEmailOpen }"
      >
        <AccordionTrigger>
          <h3 class="font-bold">Email</h3>
        </AccordionTrigger>
        <AccordionContent :class="{ 'p-0': isUpdateEmailOpen }">
          <div
            v-if="!isUpdateEmailOpen"
            class="flex flex-row items-center justify-between pl-2.5"
          >
            <p>{{ authUser?.email }}</p>

            <Button variant="ghost" @click="isUpdateEmailOpen = true">
              Update email
            </Button>
          </div>

          <AuthSettingsEmailForm
            v-else
            @close-update-email="isUpdateEmailOpen = false"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>
