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
      numItens: 0,
      filtroType: '',
      filtroDeviceType: ''
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
      this.filtrarLista();
    },
    filtrarLista() {
      let filtrados = this.produtosTotal;

      if (this.filtroType !== '') filtrados = filtrados.filter(p => p.type === Number(this.filtroType));
      if (this.filtroDeviceType !== '') filtrados = filtrados.filter(p => p.deviceType === Number(this.filtroDeviceType));


      this.numItens = filtrados.length;
      this.numPags = Math.ceil(this.numItens / this.itensPorPag);

      this.produtosListados = filtrados.slice(
        (this.pagAtual - 1) * this.itensPorPag,
        this.pagAtual * this.itensPorPag
      );
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
      this.pagAtual++;
      this.atualizarPagina();
    },
    voltarPagina() {
      this.pagAtual--;
      this.atualizarPagina();
    }
  }
}
</script>

<template>
   <div class="alarmes">
    <h2>Lista de Alarmes</h2>
        <div class="filtros">
          <label>Tipo:</label>
          <select v-model="filtroType" @change="filtrarLista">
            <option value="">Todos</option>
            <option value="1">Nulo</option>
            <option value="2">Leve</option>
            <option value="3">Regular</option>
            <option value="4">Emergência</option>
            <option value="5">Urgência</option>
          </select>

          <label>Dispositivo:</label>
          <select v-model="filtroDeviceType" @change="filtrarLista">
            <option value="" selected>Todos</option>
            <option value="1">Sensor</option>
            <option value="2">Computador</option>
            <option value="3">Servidor</option>
            <option value="4">Controle</option>
            <option value="5">Beacon</option>
          </select>
    </div>
    <ul>
      <li v-for="p in this.produtosListados" :key="p._id">
        <p>Serial: {{ p.serial }} | Tipo: {{ this.tratarTipo(p.type) }} | Tipo de dispositivo: {{ this.tratarDispositivo(p.deviceType) }}</p>
      </li>
    </ul>
    <p>Total de alarmes: {{ this.numItens }}</p>
    <div class="paginacao">
      <button @click="voltarPagina"><</button>
      <span>Página {{ pagAtual }} de {{ numPags }}</span>
      <button @click="passarPagina">></button>
    </div>
  </div>
</template>

<style>
div .alarmes {
  position: fixed;
  top: 70px;
  left: 0;
  max-width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 1000;
}

.filtros {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.filtros select {
  padding: 0.4rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  min-width: 120px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
  font-size: 0.95rem;
}

.paginacao {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.paginacao button {
  display: flex;
  flex-wrap: wrap;
  padding: 0.4rem 0.8rem;
  border: none;
  background-color: #12b4ff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.paginacao button:hover {
  background-color: #0d8ecf;
}

@media (max-width: 768px) {
  .filtros {
    flex-direction: column;
    align-items: flex-start;
  }

  .filtros select {
    width: 100%;
  }

  li {
    font-size: 0.9rem;
  }

  .paginacao {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .produtos {
    padding: 10px;
  }

  h2 {
    font-size: 1.2rem;
  }

  .paginacao button {
    width: 100%;
  }
}
</style>
