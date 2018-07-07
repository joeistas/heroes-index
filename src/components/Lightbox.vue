<template>
  <div>
    <div @click="openLightbox" class="lightbox-thumb">
      <slot name="thumb"></slot>
    </div>
    <fade-transition :duration="{ enter: 300, leave: 500 }">
      <div
        class="lightbox"
        v-show="open"
        @click="closeLightbox"
        @touchmove="stopScroll"
        @wheel="stopScroll"
        >
        <v-layout class="lightbox-layout" align-center justify-center column>
          <v-flex class="lightbox-flex">
              <v-layout column>
                <v-flex class="lightbox-button">
                  <v-btn flat icon color="transparent" class="ma-0"><v-icon color="grey lighten-2">clear</v-icon></v-btn>
                </v-flex>
                <v-flex class="lightbox-content pa-2 grey lighten-4" @click.stop="">
                  <slot></slot>
                </v-flex>
              </v-layout>
          </v-flex>
        </v-layout>
      </div>
    </fade-transition>
  </div>
</template>

<style scoped>
  .lightbox-thumb {
    cursor: pointer;
  }

  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background-color: #212121CC;
  }

  .lightbox-layout {
    width: 100%;
    height: 100%;
  }

  .lightbox-flex {
    display: inherit;
    flex-grow: 0;
    opacity: 1;
  }

  .lightbox-button {
    align-self: flex-end;
  }

  .lightbox-content {
    display: inherit;
    align-self: center;
    margin-left: 3rem;
    margin-right: 3rem;
  }
</style>

<script>
  export default {
    data: function() {
      return {
        open: false,
      }
    },
    methods: {
      openLightbox: function() {
        this.open = true
      },
      closeLightbox: function() {
        this.open = false
      },
      stopScroll: function(event) {
        event.preventDefault()
        event.stopPropagation()
      },
      closeOnEsc: function(event) {
        if(event.keyCode === 27) {
          this.open = false
        }
      }
    },
    watch: {
      open: function(open) {
        if(open) {
          document.addEventListener('keydown', this.closeOnEsc)
        }
        else {
          document.removeEventListener('keydown', this.closeOnEsc)
        }
      }
    },
  }
</script>
