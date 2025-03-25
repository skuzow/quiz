<script lang="ts" setup>
const { isAuthenticated, authUser } = useAuth();

const { isOpen } = useAuthSettings();
</script>

<template>
  <Dialog v-if="isAuthenticated && authUser" v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
      </DialogHeader>

      <Separator />

      <div class="flex flex-col gap-y-4 text-sm">
        <section>
          <Accordion type="single" collapsible default-value="change-profile">
            <AccordionItem value="change-profile">
              <AccordionTrigger>
                <h3 class="font-bold">Profile</h3>
              </AccordionTrigger>
              <AccordionContent>
                <div
                  class="flex flex-row items-center justify-between pb-1 pl-2.5 pt-1"
                >
                  <div class="flex flex-row items-center gap-x-3">
                    <CommonAvatar
                      size="sm"
                      :height="40"
                      :width="40"
                      :user="authUser"
                    />
                    <p>{{ authUser.name }}</p>
                  </div>

                  <Button variant="ghost">Update profile</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <Accordion type="single" collapsible default-value="change-username">
            <AccordionItem value="change-username">
              <AccordionTrigger>
                <h3 class="font-bold">Username</h3>
              </AccordionTrigger>
              <AccordionContent>
                <div
                  class="flex flex-row items-center justify-between pb-1 pl-2.5 pt-1"
                >
                  <p>{{ authUser.username || 'Not defined' }}</p>

                  <Button variant="ghost">Update username</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <Accordion type="single" collapsible>
            <AccordionItem value="change-email">
              <AccordionTrigger>
                <h3 class="font-bold">Email</h3>
              </AccordionTrigger>
              <AccordionContent>
                <div
                  class="flex flex-row items-center justify-between pb-1 pl-2.5 pt-1"
                >
                  <p>{{ authUser.email }}</p>

                  <Button variant="ghost">Update email</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <DialogFooter>
          <Button variant="destructive" class="mt-4">Delete account</Button>
        </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
</template>
