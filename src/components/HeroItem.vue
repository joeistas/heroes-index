<template>
  <v-card>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card-media :src="imageUrl"></v-card-media>
        </v-flex>
        <v-flex>
          <span>{{ hero.name }}</span>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script lang="ts">
  import Vue from 'vue'

  import { buildAssetUrl } from '../data/base'

  export default Vue.extend({
    props: [ 'hero', 'versionNumber', 'realm', 'selected' ],
    computed: {
      imageUrl: function() {
        return buildAssetUrl(this.hero.icon, this.versionNumber, this.realm)
      }
    },
  })
</script>
