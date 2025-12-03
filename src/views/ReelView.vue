<template>
  <main class="reel">
    <!-- Mobile (vertical) -->
    <div class="reel-mobile">
      <iframe
        src="https://player.vimeo.com/video/1143227733?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&sidedock=0&controls=0&like=0&share=0&watchlater=0&autoplay=1&muted=1&loop=1&background=1"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        referrerpolicy="strict-origin-when-cross-origin"
        title="reel-vertical"
      />
    </div>
    <!-- Desktop (horizontal) -->
    <div class="reel-desktop">
      <iframe
        src="https://player.vimeo.com/video/1143227497?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&sidedock=0&controls=0&like=0&share=0&watchlater=0&autoplay=1&muted=1&loop=1&background=1"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        referrerpolicy="strict-origin-when-cross-origin"
        title="reel-horizontal"
      />
    </div>
  </main>
</template>

<style scoped>
.reel {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:9;
}

.reel-mobile {
  width: 100%;
  height: 100%;
  max-width: calc(100vh * 9 / 16);
  max-height: 100vh;
}

.reel-desktop {
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: calc(100vw * 9 / 16);
  display: none;
}

.reel-mobile iframe,
.reel-desktop iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Show desktop version on larger screens */
@media (min-width: 768px) {
  .reel-mobile {
    display: none;
  }

  .reel-desktop {
    display: flex;
  }
}
</style>
