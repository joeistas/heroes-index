<template>
  <v-tabs v-model="activeTab$">
    <v-tab key="0">Heroes</v-tab>
    <v-tab key="1">Mounts</v-tab>
    <v-tab-item>
      <hero-list :heroes="heroes$" :version="selectedVersion$" :selected="selectedHero$"></hero-list>
    </v-tab-item>
    <v-tab-item>
      <mount-list :mounts="mounts$" :version="selectedVersion$" :selected="selectedMount$"></mount-list>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { combineLatest } from 'rxjs'
  import { map, pluck } from 'rxjs/operators'

  import { getStoreObservable } from '../data/store'
  import HeroList from './HeroList.vue'
  import MountList from './MountList.vue'

  export default Vue.extend({
    components: {
      "hero-list": HeroList,
      "mount-list": MountList,
    },
    subscriptions: function() {
      const selectedItem$ = this.$store.pipe(pluck('selectedItem'))
      const itemType$ = this.$store.pipe(pluck('params', 'itemType'))

      return {
        itemType$,
        selectedVersion$: this.$store.pipe(pluck('selectedVersion')),
        selectedHero$: combineLatest(itemType$, selectedItem$).pipe(map(([ itemType, item ]) => itemType === 'heroes' ? item : {})),
        selectedMount$: combineLatest(itemType$, selectedItem$).pipe(map(([ itemType, item ]) => itemType === 'mounts' ? item : {})),
        heroes$: this.$store.pipe(pluck('versionDetails', 'heroes')),
        mounts$: this.$store.pipe(pluck('versionDetails', 'mounts')),
        activeTab$: itemType$.pipe(map(itemType => itemType === 'heroes' ? '0' : '1'))
      }
    },
  })
</script>
