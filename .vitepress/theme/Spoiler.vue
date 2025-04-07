
<template>
    <span class="spoiler">
      <slot />
    </span>
</template>

<style>
.spoiler {
  -webkit-filter: blur(0.3em);
  filter: blur(0.3em);
  transition: filter 0.25s ease-in-out, -webkit-filter 0.25s ease-in-out !important;
}

.spoiler:hover, .spoiler:focus {
  -webkit-filter: blur(0);
  filter: blur(0);
  transition: filter 0.25s ease-in-out, -webkit-filter 0.25s ease-in-out !important;
}
</style>