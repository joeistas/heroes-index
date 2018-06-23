<template>
  <v-layout row wrap>
    <v-flex v-for="hero in heroes" :key="hero.id">
      <hero-item
        :hero="hero"
        :selected="isSelected(hero)"
        :realm="version.realm"
        :versionNumber="version.buildNumber"
        >
      </hero-item>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue'

  import HeroItem from './HeroItem.vue'

  export default Vue.extend({
    components: {
      "hero-item": HeroItem
    },
    props: [ 'heroes', 'version', 'selected' ],
    methods: {
      isSelected: function(hero: any) {
        if(!this.selected) {
          return false
        }

        return hero.id === this.selected.id
      },
    }
  })
</script>
