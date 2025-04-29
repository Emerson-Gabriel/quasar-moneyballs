<template>
  <q-slide-item
    @left="onEntrySlideLeft"
    @right="onEntrySlideRight"
    left-color="positive"
    right-color="negative"
    :id="`id-${ entry.id }`"
    :class="
      !entry.paid
        ? useLightOrDark('bg-white', 'bg-black')
        : useLightOrDark('bg-grey-2', 'bg-grey-9')
    "
  >
    <template v-slot:left>
      <q-icon name="done" />
    </template>
    <template v-slot:right>
      <q-icon name="delete" />
    </template>

    <q-item class="row">
      <q-item-section
        class="text-weight-bold col"
        :class="[useAmountColorClass(entry.amount), { 'text-strike': entry.paid }]"
      >
        {{ entry.name }}
        <q-popup-edit
          @save="onNameUpdate"
          :model-value="entry.name"
          auto-save
          v-slot="scope"
          anchor="top left"
          :offset="[17, 12]"
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
        class="text-weight-bold relative-position col"
        :class="[useAmountColorClass(entry.amount)]"
        side
      >
        <span :class="{ 'text-strike': entry.paid }">
          {{ useCurrencify(entry.amount) }}
        </span>
        <q-popup-edit
          @save="onAmountUpdate"
          :model-value="entry.amount"
          auto-save
          v-slot="scope"
          anchor="top right"
          self="top right"
          :offset="[17, 12]"
          :cover="false"
          label-set="Ok"
          buttons=""
        >
          <q-input
            v-model.number="scope.value"
            @keyup.enter="scope.set"
            input-class="text-weight-bold letter-spacing-nome text-right"
            type="number"
            step="0.01"
            v-select-all
            autofocus
            dense
          />
        </q-popup-edit>
        <q-chip
          v-if="storeSettings.settings.showRunningBalance"
          :class="useAmountColorClass(storeEntries.runningBalances[index])"
          class="absolute-bottom-right running-bal"
          size="9px"
          outline
          dense
        >
          {{ useCurrencify(storeEntries.runningBalances[index]) }}
        </q-chip>
      </q-item-section>
      <q-item-section v-if="storeEntries.options.sort" side>
        <q-icon class="handle" name="reorder" color="primary " />
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useStoreEntries } from "src/stores/storeEntries";
import { useStoreSettings } from "src/stores/storeSettings";
import { useCurrencify } from "src/use/useCurrencify";
import { useAmountColorClass } from "src/use/useAmountColorClass";
import { useLightOrDark } from "src/use/useLightOrDark";
/* quando for chamar directive precisa ser no padrão com - e minusculo ex: v-select-all */
import vSelectAll from "src/directives/directiveSelectAll";
/*
    stores
  */
const storeEntries = useStoreEntries();
const storeSettings = useStoreSettings();

/*
  props
  aqui estarei acessando as props que foi passada para esse componente que no caso é os entrys
*/
const props = defineProps({
  entry: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

/*
  quasar
*/
const $q = useQuasar();

/* slide itens */

const onEntrySlideLeft = ({ reset }) => {
  storeEntries.updateEntry(props.entry.id, { paid: !props.entry.paid });
  reset();
};

const onEntrySlideRight = ({ reset }) => {
  if (storeSettings.settings.promptToDelete) promptToDelete(reset);
  else storeEntries.deleteEntry(props.entry.id);
};

const promptToDelete = (reset) => {
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
  storeEntries.updateEntry(props.entry.id, { name: value });
};

const onAmountUpdate = (value) => {
  storeEntries.updateEntry(props.entry.id, { amount: value });
};
</script>
