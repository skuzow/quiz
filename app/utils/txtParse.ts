export const txtParse = async (file: File): Promise<string> => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();

    reader.onloadend = (e) => {
      const result = e.target?.result;

      resolve(result as string);
    };

    reader.readAsText(file);
  });
};
