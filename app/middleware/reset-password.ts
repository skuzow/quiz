import { z } from 'zod';

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const token = to.query.token;

  const result = z.string().safeParse(token);

  if (!result.success) {
    const localePath = useLocalePath();

    return await navigateTo(localePath('/'));
  }
});
