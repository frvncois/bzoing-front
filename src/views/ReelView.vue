<template>
  <main class="reel">
    <iframe
      src="https://player.vimeo.com/video/1143186991?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&title=0&byline=0&portrait=0&controls=0&background=1"
      frameborder="0"
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      title="reel"
    />
  </main>
</template>

<style scoped>
.reel {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
}

.reel iframe {
  width: 100%;
  height: 100%;
}
</style>
