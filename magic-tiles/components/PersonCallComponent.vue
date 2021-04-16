<template>
  <div>
    <input v-model="firstName" />
    <h1>FullName: {{ this.fullName }}</h1>
    <h1>Num of Changes: {{ this.numOfChanges }}</h1>
    <h1>lenght Of Firstname {{ this.lenghtOfFirstname }}</h1>
    <button @click="speak">Speak</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Prop() whatToSay!: string

  counter = 1
  firstName = 'Donna'
  numOfChanges = 0
  lenghtOfFirstname = 5

  initialLastName = 'Summer'
  lastName = this.initialLastName

  get fullName() {
    return this.firstName + this.lastName
  }

  @Watch('firstName')
  onFirstNameChanged() {
    this.lastName = this.initialLastName
    this.numOfChanges++
    this.lenghtOfFirstname = this.firstName.length
  }

  speak() {
    alert('This is ' + this.fullName + ' speaking. ' + this.whatToSay)
  }
}
</script>
