<script lang="ts" setup>
import { useToast } from '@/components/ui/toast/use-toast';

const { t: $t } = useI18n();

const { authUser, forgotPassword } = useAuth();

const { toast } = useToast();

const isLoadingUpdatePassword: Ref<boolean> = ref(false);

const updatePassword = async () => {
  if (isLoadingUpdatePassword.value) return;

  isLoadingUpdatePassword.value = true;

  const { error } = await forgotPassword(authUser.value!.email);

  isLoadingUpdatePassword.value = false;

  if (error) {
    toast({
      title: $t('toast.auth.settings.password.error'),
      description: error.message,
      variant: 'destructive'
    });
  } else {
    toast({
      title: $t('toast.auth.settings.password.title'),
      description: $t('toast.auth.settings.password.description')
    });
  }
};
</script>

<template>
  <section>
    <Accordion type="single" collapsible>
      <AccordionItem value="update-password">
        <AccordionTrigger>
          <h3 class="font-bold">
            {{ $t('auth.settings.password.title') }}
          </h3>
        </AccordionTrigger>
        <AccordionContent
          class="flex flex-col justify-between gap-y-2 pl-2.5 sm:flex-row sm:items-center sm:gap-y-0"
        >
          <p>••••••••</p>

          <div class="text-end">
            <Button variant="ghost" @click="updatePassword">
              <IconLoader v-if="isLoadingUpdatePassword" class="mr-2" />
              {{ $t('auth.settings.password.button') }}
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>
