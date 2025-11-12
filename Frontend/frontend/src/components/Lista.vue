<script>
import axios from 'axios'

export default {
    data() {
        return {
            produtos: [],
            pagAtual: 1,
            itensPorPag: 10
        }
    },
    async mounted() {
        const res = await axios.get('http://localhost:8082/alarm');
        this.produtos = res.data;
    }
}
</script>

<template>
   <div class="produtos">
    <h2>Lista de Produtos</h2>
    <ul>
      <li v-for="p in this.produtos" :key="p._id">
        <p>{{ p }}</p>
      </li>
    </ul>
  </div>
</template>

<style>
</style>
