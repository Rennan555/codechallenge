<script>
import axios from 'axios'

export default {
  data() {
    return {
      produtosListados: [],
      produtosTotal: [],
      pagAtual: 1,
      itensPorPag: 10,
      numPags: 0,
      numItens: 0
    }
  },
  async mounted() {
    this.getProdutos();
    this.intervalId = setInterval(() => {
      this.getProdutos();
      this.atualizarPagina();
    }, 5000) // 5 segundos
  },
  methods: {
    async getProdutos() {
      const res = await axios.get('http://localhost:8082/alarm');
      this.produtosTotal = res.data;
      this.numItens = this.produtosTotal.length;
      this.numPags = Math.ceil(this.produtosTotal.length / this.itensPorPag);
      this.atualizarPagina();
    },
    async atualizarPagina() {
      if (this.pagAtual > this.numPags) this.pagAtual = 1;
      if (this.pagAtual < 1) this.pagAtual = this.numPags;
      this.produtosListados = this.produtosTotal.slice((this.pagAtual - 1) * this.itensPorPag, this.pagAtual * this.itensPorPag);
    },
    tratarTipo(type) {
      switch (type) {
        case 1:
          return 'Nulo'
        case 2:
          return 'Leve'
        case 3:
          return 'Regular'
        case 4:
          return 'Emergência'
        case 5:
          return 'Urgência'
        default:
          return 'Tipo Desconhecido'
      }
    },
    tratarDispositivo(deviceType) {
      switch (deviceType) {
        case 1:
          return 'Sensor'
        case 2:
          return 'Computador'
        case 3:
          return 'Servidor'
        case 4:
          return 'Controle'
        case 5:
          return 'Beacon'
        default:
          return 'Dispositivo Desconhecido'
      }
    },
    passarPagina() {
      this.pagAtual++
      this.atualizarPagina()
    },
    voltarPagina() {
      this.pagAtual--
      this.atualizarPagina()
    }
  }
}
</script>

<template>
   <div class="produtos">
    <h2>Lista de Alarmes</h2>
    <ul>
      <li v-for="p in this.produtosListados" :key="p._id">
        <p>Serial: {{ p.serial }} | Tipo: {{ this.tratarTipo(p.type) }} | Tipo de dispositivo: {{ this.tratarDispositivo(p.deviceType) }}</p>
      </li>
    </ul>
    <p>Total de alarmes: {{ this.numItens }}</p>
    <button @click="passarPagina">+</button>
    <button @click="voltarPagina">-</button>
    <p>Pagina: {{ this.pagAtual }}</p>
  </div>
</template>

<style>
div .produtos {
  position: fixed;
  top: 70px;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 1000;
}
</style>
