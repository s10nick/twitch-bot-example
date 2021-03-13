<template>
  <div>
    <h1 v-if="user">{{ user }}</h1>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      user: null,
      error: null,
      socket : io('localhost')
    }
  },
  mounted() {
    this.socket.emit('login')
    this.socket.on('user', (data) => {
      this.user = data
      console.log(data)
    })
    this.socket.on('error', (data) => this.error = data)
  }
}
</script>

<style>

</style>

