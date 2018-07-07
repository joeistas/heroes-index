<template>
  <v-app>
    <error-toast :error="error$"></error-toast>
    <toolbar></toolbar>
    <v-content class="grey lighten-3">
      <v-container app>
        <router-view></router-view>
        <content-overlay :show="loading$ || error$" :spinner="loading$"></content-overlay>
      </v-container>
    </v-content>
    <hi-footer></hi-footer>
  </v-app>
</template>

<style scoped>
  a {
    color: white;
    text-decoration: none;
  }
</style>

<script lang="ts">
  import Vue from 'vue'
  import { combineLatest } from 'rxjs'
  import { map, pluck, startWith, filter } from 'rxjs/operators'

  import Toolbar from './Toolbar.vue'
  import ContentOverlay from './ContentOverlay.vue'
  import ErrorToast from './ErrorToast.vue'
  import Footer from './Footer.vue'
  import NotFoundError from '../models/NotFoundError'

  export default Vue.extend({
    components: {
      'toolbar': Toolbar,
      'content-overlay': ContentOverlay,
      'error-toast': ErrorToast,
      'hi-footer': Footer,
    },
    subscriptions: function() {
      return {
        loading$: combineLatest(
          this.$store.pipe(pluck('allVersions')),
          this.$store.pipe(pluck('versionDetails')),
          this.$store.pipe(pluck('itemJSON')),
        ).pipe(
          map(values => values.some(value => !value)),
          startWith(true),
        ),
        error$: this.$storeErrors.pipe(
          filter(error => !(error as NotFoundError).objectNotFound),
        )
      }
    }
  })
</script>
