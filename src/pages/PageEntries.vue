<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered="" separator="">
        <q-item v-for="entry in entries" :key="entry.id">
          <q-item-section
            class="text-weight-bold"
            :class="useAmountColorClass(entry.amount)"
          >
            {{ entry.name }}
          </q-item-section>

          <q-item-section
            class="text-weight-bold"
            :class="useAmountColorClass(entry.amount)"
            side
          >
            {{ useCurrencify(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-footer class="bg-transparent">
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-4">
        <div class="col text-grey-7 text-h6">
          Balance
        </div>
        <div 
          :class="useAmountColorClass(balance)"
          class="col text-h6 text-right"
          >
          {{ useCurrencify(balance) }} 
        </div>
      </div>
      <div class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input outlined dense v-model="text" placeholder="Name" bg-color="white" />
        </div>
        <div class="col">
          <q-input
            outlined
            dense
            v-model="text"
            placeholder="Amount"
            input-class="text-right"
            type="number"
            step="0.01"
            bg-color="white"
          />
        </div>
        <div class="col col-auto">
          <q-btn round color="primary" icon="add" />
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
/* 
    imports
  */
import { ref, computed } from "vue";
import { useCurrencify } from "src/use/useCurrencify";
import { useAmountColorClass } from "src/use/useAmountColorClass";

  /* 
    entries
  */
  const entries = ref([
    {
      id: "id0",
      name: "Salário",
      amount: 4999.99,
    },
    {
      id: "id1",
      name: "Aluguel",
      amount: -99.0,
    },
    {
      id: "id2",
      name: "Telefone",
      amount: -199.0,
    },
    {
      id: "id3",
      name: "Desconhecido",
      amount: 0,
    },
  ]);

  /* balance */
  const balance = computed(() => {
    return entries.value.reduce((accumulator, { amount }) => {
      return accumulator + amount
    }, 0)
  }); 

</script>
