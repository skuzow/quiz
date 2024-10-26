<script lang="ts" setup></script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        EN
        <span class="sr-only">Toggle language</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="font-medium">
      <DropdownMenuItem class="cursor-pointer">English</DropdownMenuItem>
      <DropdownMenuItem class="cursor-pointer">Spanish</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
