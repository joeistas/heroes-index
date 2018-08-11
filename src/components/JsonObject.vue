<template>
  <v-container grid-list-md class="json-object pr-0">
    <v-layout class="mt-0">
      <v-flex xs12>
        <v-btn flat class="json-object-key ma-0" @click="onClick()">
          {{ computedKey }}
          <v-icon>{{ expand ? 'arrow_drop_up' : 'arrow_drop_down' }}</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <collapse-transition>
      <div column v-if="expand" class="json-object-properties pl-3 mb-3">
        <json-property :property-key="key" :property-value="value" v-for="(value, key) in propertyValue"></json-property>
      </div>
    </collapse-transition>
  </v-container>
</template>

<style scoped>
  .json-object {
    margin-left: -16px;
    width: calc(100% + 12px);
  }

  .json-object-key {
    text-transform: none;
  }

  .json-object-properties {
    border-top: 1px solid #DDDDDD;
    border-bottom: 1px solid #DDDDDD;
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
        expand: this.propertyValue && Object.keys(this.propertyValue).length === 1 ? true : false,
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
          const ability = this.propertyValue.ability
          return ability.name || ability.id
        }

        if(this.propertyValue.button) {
          const button = this.propertyValue.button
          return button.name || button.id
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
