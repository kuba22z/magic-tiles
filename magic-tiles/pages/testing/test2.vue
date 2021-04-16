<template>
  <div>
    <label
      >Update myDataProperty
      <input :value="myDataProperty" @input="updateMyProperty($event)" />
    </label>
    <div>{{ myDataProperty }}</div>
    <PersonCallComponent :what-to-say="'I am a good person'" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  // Data property
  myDataProperty: string = 'Data Property'

  // Component method
  updateMyProperty($event: { target: { value: string } }) {
    this.myDataProperty = $event.target.value
  }
}
</script>
