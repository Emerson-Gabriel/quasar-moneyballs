<template>
  <q-form
    @submit="addEntryFormSubmit"
    class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
  >
    <div class="col">
      <q-input
        outlined
        dense
        v-model="addEntryForm.name"
        ref="nameRef"
        placeholder="Name"
        v-select-all
        :bg-color="useLightOrDark('white', 'black')"
      />
    </div>
    <div class="col">
      <q-input
        outlined
        dense
        v-model.number="addEntryForm.amount"
        placeholder="Amount"
      input-class="text-right"
        type="number"
        v-select-all
        step="0.01"
        :bg-color="useLightOrDark('white', 'black')"
      />
    </div>
    <div class="col col-auto">
      <q-btn type="submit" round color="primary" icon="add" />
    </div>
  </q-form>
</template>
<script setup>
/*
    imports
  */
import { reactive, ref } from "vue"
import { useStoreEntries } from "src/stores/storeEntries"
import { useLightOrDark } from "src/use/useLightOrDark"
import vSelectAll from 'src/directives/directiveSelectAll'

/*
    stores
  */
const storeEntries = useStoreEntries();

/* add entry */
const nameRef = ref(null);

const addEntryFormDefault = {
  name: "",
  amount: null,
};

const addEntryForm = reactive({
  ...addEntryFormDefault,
});

const addEntryFormReset = () => {
  Object.assign(addEntryForm, addEntryFormDefault);
  nameRef.value.focus();
};

const addEntryFormSubmit = () => {
  storeEntries.addEntry(addEntryForm);
  addEntryFormReset();
};
</script>
