<template>
  <div class="flex flex-col gap-y-6">
    <CommonTopSkeleton />

    <div class="flex flex-col gap-y-2">
      <div class="md:flex md:justify-between">
        <Skeleton class="h-[29.5px] w-5/6 rounded-md md:w-2/6" />

        <Skeleton class="hidden h-[27.5px] rounded-md md:flex md:w-1/6" />
      </div>

      <Skeleton class="h-[21px] w-2/3 rounded-md md:w-1/6" />

      <ul class="flex gap-x-2">
        <li v-for="indexRole in 2" :key="indexRole">
          <Skeleton class="h-[22px] w-[60px] rounded-md" />
        </li>
      </ul>

      <Skeleton class="h-[20px] w-2/6 rounded-md md:hidden" />
    </div>
  </div>
</template>
