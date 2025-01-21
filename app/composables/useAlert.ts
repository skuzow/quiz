interface AlertOptions {
  title: string;
  description: string;
  cancel?: string;
  confirm?: string;
}

let resolvePromise: ((value: boolean) => void) | null = null;

export const useAlert = () => {
  const isOpen = useState<boolean>('alert:isOpen', () => false);
  const options = useState<AlertOptions | null>('alert:options', () => null);

  const alert = (alertOptions: AlertOptions): Promise<boolean> => {
    options.value = alertOptions;
    isOpen.value = true;

    return new Promise((resolve) => (resolvePromise = resolve));
  };

  const dismiss = (value: boolean) => {
    isOpen.value = false;

    if (resolvePromise) resolvePromise(value);
  };

  return {
    isOpen,
    options,
    alert,
    dismiss
  };
};
