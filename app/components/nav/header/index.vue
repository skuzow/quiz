<template>
  <header class="sticky top-0 z-10 bg-background/80 py-2.5 backdrop-blur-md">
    <nav class="container flex max-w-6xl flex-1 justify-between">
      <div class="flex gap-x-5">
        <NuxtLink to="/" title="Home" class="flex items-center gap-x-2">
          <NavLogo />
          <span class="font-bold">skuzow/quiz</span>
        </NuxtLink>

        <NavHeaderMenuDesktop class="hidden md:flex" />
      </div>

      <ul class="hidden md:flex md:gap-x-4">
        <li>
          <NavHeaderDropdownLang />
        </li>

        <li>
          <NavHeaderDropdownTheme />
        </li>

        <li>
          <NuxtLink to="/login" title="Log In">
            <Button variant="secondary">Log In</Button>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/signup" title="Sign Up">
            <Button>Sign Up</Button>
          </NuxtLink>
        </li>
      </ul>

      <NavHeaderMenuMobile class="md:hidden" />
    </nav>
  </header>
</template>
