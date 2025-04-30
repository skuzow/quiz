<template>
  <div class="flex flex-col gap-y-2">
    <div class="md:flex md:gap-x-3">
      <Skeleton class="h-[27.5px] rounded-md md:w-5/6" />

      <Skeleton class="hidden h-[27.5px] rounded-md md:flex md:w-1/6" />
    </div>

    <Skeleton class="h-[24px] w-5/6 rounded-md md:w-4/6" />

    <Skeleton class="h-[20px] w-4/6 rounded-md md:hidden" />
  </div>
</template>
