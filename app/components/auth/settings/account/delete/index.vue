<script lang="ts" setup>
import { useToast } from '@/components/ui/toast/use-toast';

const { deleteAuthUser } = useAuth();

const { closeAuthSettings } = useAuthSettings();

const localePath = useLocalePath();
const { t: $t } = useI18n();

const { alert } = useAlert();
const { toast } = useToast();

const isLoadingDeleteAccount: Ref<boolean> = ref(false);

const deleteAccount = async () => {
  if (isLoadingDeleteAccount.value) return;

  closeAuthSettings();

  const response: boolean = await alert({
    title: $t('alert.auth.settings.deleteAccount.title'),
    description: $t('alert.auth.settings.deleteAccount.description'),
    danger: true
  });

  if (!response) return;

  isLoadingDeleteAccount.value = true;

  const { error } = await deleteAuthUser({
    callbackURL: localePath('/')
  });

  isLoadingDeleteAccount.value = false;

  if (error) {
    toast({
      title: $t('toast.auth.settings.deleteAccount.error'),
      description: error.message,
      variant: 'destructive'
    });
  } else {
    toast({
      title: $t('toast.auth.settings.deleteAccount.title'),
      description: $t('toast.auth.settings.deleteAccount.description')
    });
  }
};
</script>

<template>
  <section>
    <Accordion type="single" collapsible>
      <AccordionItem value="delete-account" class="border-b-transparent">
        <AccordionTrigger>
          <h3 class="font-bold">
            {{ $t('auth.settings.deleteAccount.title') }}
          </h3>
        </AccordionTrigger>
        <AccordionContent class="flex items-center justify-between pl-2.5">
          <p>{{ $t('auth.settings.deleteAccount.description') }}</p>

          <Button variant="destructive" @click="deleteAccount">
            {{ $t('auth.settings.deleteAccount.title') }}
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
</template>

<style lang="scss" scoped></style>
