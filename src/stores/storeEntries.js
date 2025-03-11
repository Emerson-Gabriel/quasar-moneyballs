import { defineStore } from "pinia";
import { ref, computed, reactive } from "vue";
import { uid, Notify, event } from "quasar";

export const useStoreEntries = defineStore('entries', () => {

    /* 
        state
    */
    const entries = ref([
        {
            id: "id0",
            name: "Salário",
            amount: 2999.99,
            paid: false
        },
        {
            id: "id1",
            name: "Aluguel",
            amount: -99.0,
            paid: false
        },
        {
            id: "id2",
            name: "Telefone Naya",
            amount: -199.0,
            paid: false
        },
        {
            id: "id3",
            name: "Desconhecido",
            amount: 0,
            paid: false
        },
    ]);

    const options = reactive ({
        sort: false
    })

    /* 
        getters
    */
    const balance = computed(() => {
        return entries.value.reduce((accumulator, { amount }) => {
            return accumulator + amount
        }, 0)
    });

    const balancePaid = computed(() => {
        return entries.value.reduce((accumulator, { amount, paid }) => {
            // if (paid) return accumulator + amount
            // else return accumulator
            return paid ? accumulator + amount : accumulator
        }, 0)
    });


    /* 
     actions
    */
    const addEntry = addEntryForm => {
        const newEntry = Object.assign({}, addEntryForm, { id: uid(), paid: false })
        entries.value.push(newEntry)
    }

    const deleteEntry = entryId => {
        const index = getEntryIndexById(entryId)
        entries.value.splice(index, 1)
        Notify.create({
            message: 'Entry deleted',
            position: 'top'
        })
    }

    const updateEntry = (entryId, updates) => {
        const index = getEntryIndexById(entryId)
        Object.assign(entries.value[index], updates)
    }

    const sortEnd = ({oldIndex, newIndex}) => {
        const movedEntry = entries.value[oldIndex]
        entries.value.splice(oldIndex, 1)
        entries.value.splice(newIndex, 0, movedEntry)
    }

    /* helpers */
    const getEntryIndexById = entryId => {
        return entries.value.findIndex(entry => entryId === entry.id)
    }

    /* return */

    return { 
        /* state */
        entries,
        options,
        
        /* getters */
        balance,
        balancePaid,

        /* actions */
        addEntry,
        deleteEntry,
        updateEntry,
        sortEnd
    }
})