<template>
  <v-container grid-list-md class="px-0">
    <v-layout>
      <v-flex xs3>
        <v-btn flat class="json-object-key ma-0" @click="onClick()">
          {{ computedKey }}
          <v-icon>{{ expand ? 'arrow_drop_up' : 'arrow_drop_down' }}</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <collapse-transition>
      <div column v-show="expand" class="json-object-properties mx-3 mb-3">
        <json-property :propertyKey="key" :propertyValue="value" v-for="(value, key) in propertyValue"></json-property>
      </div>
    </collapse-transition>
  </v-container>
</template>

<style scoped>
  .json-object-key {
    float: right;
    text-transform: none;
  }

  .json-object-properties {
    border-top: 1px solid #BDBDBD;
    border-bottom: 1px solid #BDBDBD;
  }
</style>

<script lang="ts">
  import Vue from 'vue'

  import JsonPropertyKey from './JsonPropertyKey.vue'

  export default Vue.extend({
    name: "json-object",
    components: {
      "json-property": () => import("./JsonProperty.vue"),
      "json-property-key": JsonPropertyKey,
    },
    props: {
      propertyKey: String,
      propertyValue: Object,
    },
    data: function() {
      return {
        expand: false,
      }
    },
    computed: {
      computedKey: function() {
        if(this.propertyKey) {
          return this.propertyKey
        }

        const key = this.propertyValue.name || this.propertyValue.id
        if(key) {
          return key
        }

        if(this.propertyValue.ability) {
          return this.propertyValue.ability.name || this.propertyValue.ability.id
        }

        return undefined
      },
    },
    methods: {
      onClick: function() {
        this.expand = !this.expand
      },
    },
  })
</script>
