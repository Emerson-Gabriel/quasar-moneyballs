<template>
  <q-slide-item
    @left="onEntrySlideLeft"
    @right="onEntrySlideRight"
    left-color="positive"
    right-color="negative"
    :class="{ 'bg-grey-2' : entry.paid }"
  >
    <template v-slot:left>
            <q-icon name="done" />
          </template>
    <template v-slot:right>
      <q-icon name="delete" />
    </template>

    <q-item>
      <q-item-section class="text-weight-bold" 
        :class="[
          useAmountColorClass(entry.amount),
          { 'text-strike' : entry.paid }
        ]"
      >
        {{ entry.name }}
        <q-popup-edit 
          @save="onNameUpdate"
          :model-value="entry.name" 
          auto-save 
          v-slot="scope"
          anchor="top left"
          :offset="[17,12]"
          :cover="false"
          label-set="Ok"
          buttons=""
        >
          <q-input 
            v-model="scope.value" 
            dense 
            input-class="text-weight-bold letter-spacing-nome"
            autofocus 
            @keyup.enter="scope.set" 
            v-select-all
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section
        class="text-weight-bold"
        :class="[
          useAmountColorClass(entry.amount),
          { 'text-strike' : entry.paid }
        ]"
        side
      >
        {{ useCurrencify(entry.amount) }}
        <q-popup-edit 
          @save="onAmountUpdate"
          :model-value="entry.amount" 
          auto-save 
          v-slot="scope"
          anchor="top left"
          :offset="[17,12]"
          :cover="false"
          label-set="Ok"
          buttons=""
        >
          <q-input 
            v-model.number ="scope.value" 
            @keyup.enter="scope.set" 
            input-class="text-weight-bold letter-spacing-nome text-right"
            type="number"
            step="0.01"
            v-select-all
            autofocus 
            dense 
          />
        </q-popup-edit>
      </q-item-section>
      <q-item-section
        v-if="storeEntries.options.sort"
        side
      >
        <q-icon 
          class="handle"
          name="reorder"
          color="primary "
        />
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useStoreEntries } from 'src/stores/storeEntries'
import { useCurrencify } from 'src/use/useCurrencify'
import { useAmountColorClass } from 'src/use/useAmountColorClass'
/* quando for chamar directive precisa ser no padrão com - e minusculo ex: v-select-all */
import vSelectAll from 'src/directives/directiveSelectAll'
/* 
    stores
  */
const storeEntries = useStoreEntries();

/* 
  props
  aqui estarei acessando as props que foi passada para esse componente que no caso é os entrys
*/
const props = defineProps({
  entry: {
    type: Object,
    required: true
  }
})

/* 
  quasar 
*/
const $q = useQuasar();

/* slide itens */

const onEntrySlideLeft = ({ reset }) => {
  storeEntries.updateEntry(props.entry.id, {paid: !props.entry.paid})
  reset()
}

const onEntrySlideRight = ({ reset }) => {
  $q.dialog({
    title: "Delete Entry",
    message: `
        Delete this entry??
        <div class='q-mt-md text-weight-bold ${useAmountColorClass(props.entry.amount)}'>
          ${props.entry.name} : ${useCurrencify(props.entry.amount)}
        </div>
      `,
    cancel: true,
    persistent: true,
    html: true,
    ok: {
      label: "Delete",
      color: "negative",
      noCaps: true,
    },
    cancel: {
      color: "primary",
      noCaps: true,
    },
  })
  .onOk(() => {
    storeEntries.deleteEntry(props.entry.id);
  })
  .onCancel(() => {
    reset();
  });
};

/* actions amount and name */
const onNameUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { name: value })
}

const onAmountUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { amount: value })
}

</script>
