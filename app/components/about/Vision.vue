<template>
  <section>
    <div class="flex flex-col items-center justify-between gap-10 md:flex-row">
      <CommonCard class="w-full overflow-hidden md:w-3/5">
        <CommonPicture
          src="/images/about/vision.avif"
          :width="630"
          :height="380"
          loading="lazy"
          :alt="$t('about.vision.title')"
          class="h-full object-cover md:w-full"
        />
      </CommonCard>

      <div class="w-full md:w-2/5">
        <h2 class="mb-4 text-3xl font-semibold md:text-4xl">
          <CommonGradientText direction="bottomTop">
            {{ $t('about.vision.title') }}
          </CommonGradientText>
        </h2>

        <p class="text-lg">
          {{ $t('about.vision.description.first') }}
        </p>

        <br />

        <p class="text-lg">
          {{ $t('about.vision.description.second') }}
        </p>
      </div>
    </div>
  </section>
</template>
