<script>
import axios from 'axios'

export default {
  data() {
    return {
      produtos: [],
      pagAtual: 1,
      itensPorPag: 10,
      numItens: 0
    }
  },
  async mounted() {
    this.getProdutos();
    this.intervalId = setInterval(() => {
      this.atualizarPagina();
    }, 5000) // 5 segundos
  },
  methods: {
    async getProdutos() {
      const res = await axios.get('http://localhost:8082/alarm');
      this.produtos = res.data;
      this.numItens = this.produtos.length
      this.atualizarPagina();
    },
    async atualizarPagina() {
      if (this.pagAtual > this.produtos.length / this.itensPorPag) this.pagAtual = 1
      this.produtos = this.produtos.slice((this.pagAtual - 1) * this.itensPorPag, this.pagAtual * this.itensPorPag)
    }
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
    <button>+</button>
    <button>-</button>
  </div>
</template>

<style>
</style>
