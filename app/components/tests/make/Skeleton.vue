<template>
  <div class="flex flex-col gap-y-8">
    <div class="flex flex-col gap-y-6">
      <CommonTopSkeleton />

      <TestsInfoSkeleton />
    </div>

    <ol class="flex flex-col gap-y-8">
      <li
        v-for="indexQuestion in 10"
        :key="indexQuestion"
        class="flex flex-col gap-y-4"
      >
        <Skeleton class="h-[24px] rounded-md md:w-4/6" />

        <ol class="flex flex-col gap-y-2">
          <li
            v-for="indexOption in 4"
            :key="indexOption"
            class="flex items-center gap-x-3"
          >
            <Skeleton
              class="h-[16px] w-[16px]"
              :class="indexQuestion % 2 == 0 ? 'rounded-sm' : 'rounded-full'"
            />

            <Skeleton class="h-[14px] w-5/6 rounded-md md:w-3/6" />
          </li>
        </ol>
      </li>
    </ol>

    <Skeleton class="h-[36px] rounded-md md:w-[82px]" />
  </div>
</template>
