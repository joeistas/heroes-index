<template>
  <v-tabs v-model="activeTab$">
    <v-tab key="0">Heroes</v-tab>
    <v-tab key="1">Mounts</v-tab>
    <v-tab-item>
      <hero-list :heroes="heroes$" :realm="realm$" :version="selectedVersion$" :selected="selectedHero$"></hero-list>
    </v-tab-item>
    <v-tab-item>
      <mount-list :mounts="mounts$" :realm="realm$" :version="selectedVersion$" :selected="selectedMount$"></mount-list>
    </v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { map } from 'rxjs/operators'

  import { getStoreObservable } from '../data/store'
  import HeroList from './HeroList.vue'
  import MountList from './MountList.vue'

  export default Vue.extend({
    components: {
      "hero-list": HeroList,
      "mount-list": MountList,
    },
    subscriptions: function() {
      const selectedHero$ = getStoreObservable(this, 'selectedHero$')
      return {
        realm$: getStoreObservable(this, 'realm$'),
        selectedVersion$: getStoreObservable(this, 'selectedVersion$'),
        selectedHero$,
        selectedMount$: getStoreObservable(this, 'selectedMount$'),
        heroes$: getStoreObservable(this, 'heroes$'),
        mounts$: getStoreObservable(this, 'mounts$'),
        activeTab$: selectedHero$.pipe(map(hero => !!hero === 'heroes' ? '0' : '1'))
      }
    },
  })
</script>
