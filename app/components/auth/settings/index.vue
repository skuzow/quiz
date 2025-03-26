<script lang="ts" setup>
const { isAuthenticated, authUser } = useAuth();

const { isOpen, isProfileFormOpen, isUsernameFormOpen, isEmailFormOpen } =
  useAuthSettings();
</script>

<template>
  <Dialog v-if="isAuthenticated && authUser" v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
      </DialogHeader>

      <Separator />

      <div class="flex flex-col gap-y-4">
        <section>
          <Accordion type="single" collapsible default-value="change-profile">
            <AccordionItem
              value="change-profile"
              :class="{ 'border-b-transparent': isProfileFormOpen }"
            >
              <AccordionTrigger>
                <h3 class="font-bold">Profile</h3>
              </AccordionTrigger>
              <AccordionContent :class="{ 'p-0': isProfileFormOpen }">
                <div
                  v-if="!isProfileFormOpen"
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

                  <Button variant="ghost" @click="isProfileFormOpen = true">
                    Update profile
                  </Button>
                </div>

                <AuthSettingsFormProfile
                  v-if="isProfileFormOpen"
                  @close-profile-form="isProfileFormOpen = false"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <Accordion type="single" collapsible default-value="change-username">
            <AccordionItem
              value="change-username"
              :class="{ 'border-b-transparent': isUsernameFormOpen }"
            >
              <AccordionTrigger>
                <h3 class="font-bold">Username</h3>
              </AccordionTrigger>
              <AccordionContent :class="{ 'p-0': isUsernameFormOpen }">
                <div
                  v-if="!isUsernameFormOpen"
                  class="flex flex-row items-center justify-between pb-1 pl-2.5 pt-1"
                >
                  <p>{{ authUser.username || 'Not defined' }}</p>

                  <Button variant="ghost" @click="isUsernameFormOpen = true">
                    Update username
                  </Button>
                </div>

                <AuthSettingsFormUsername
                  v-if="isUsernameFormOpen"
                  @close-username-form="isUsernameFormOpen = false"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section>
          <Accordion type="single" collapsible>
            <AccordionItem
              value="change-email"
              :class="{ 'border-b-transparent': isEmailFormOpen }"
            >
              <AccordionTrigger>
                <h3 class="font-bold">Email</h3>
              </AccordionTrigger>
              <AccordionContent :class="{ 'p-0': isEmailFormOpen }">
                <div
                  v-if="!isEmailFormOpen"
                  class="flex flex-row items-center justify-between pb-1 pl-2.5 pt-1"
                >
                  <p>{{ authUser.email }}</p>

                  <Button variant="ghost" @click="isEmailFormOpen = true">
                    Update email
                  </Button>
                </div>

                <AuthSettingsFormEmail
                  v-if="isEmailFormOpen"
                  @close-email-form="isEmailFormOpen = false"
                />
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
