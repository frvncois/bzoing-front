<template>
  <main class="reel">
    <!-- Mobile (vertical) -->
    <div class="reel-mobile">
      <iframe
        src="https://player.vimeo.com/video/1143227733?badge=0&autopause=0&player_id=0&app_id=58479"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        title="reel-vertical"
      />
    </div>
    <!-- Desktop (horizontal) -->
    <div class="reel-desktop">
      <iframe
        src="https://player.vimeo.com/video/1143227497?badge=0&autopause=0&player_id=0&app_id=58479"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
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
}

.reel-mobile,
.reel-desktop {
  position: relative;
  width: 100%;
  height: 100%;
}

.reel-mobile {
  padding-top: 177.78%; /* 9:16 aspect ratio */
}

.reel-desktop {
  padding-top: 56.25%; /* 16:9 aspect ratio */
  display: none;
}

.reel-mobile iframe,
.reel-desktop iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Show desktop version on larger screens */
@media (min-width: 768px) {
  .reel-mobile {
    display: none;
  }

  .reel-desktop {
    display: block;
  }
}
</style>
