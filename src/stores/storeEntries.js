import { defineStore } from "pinia";
import { ref, computed, reactive, watch, nextTick } from "vue";
import { uid, Notify, event, LocalStorage } from "quasar";

export const useStoreEntries = defineStore('entries', () => {

    /*
        state
    */
    const entries = ref([
        /* {
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
        }, */
    ]);

    watch(entries.value, () => {
      saveEntries()
    })

    const options = reactive ({
        sort: false
    })


    const loadEntries = () => {
      const savedEntries = LocalStorage.getItem('entries')
      if (savedEntries) Object.assign(entries.value, savedEntries)
    }

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

    const runningBalances = computed(() => {
      let runningBalances = [],
        currentRunningBalance = 0

      if (entries.value.length) {
        entries.value.forEach(entry => {
          let entryAmount = entry.amount ? entry.amount : 0
          currentRunningBalance = currentRunningBalance + entryAmount
          runningBalances.push(currentRunningBalance)
        })
      }

      return runningBalances
    })

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
        removeSlideItemIfExists(entryId)
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

    const saveEntries = () => {
      LocalStorage.set('entries', entries.value)
    }

    /* helpers */
    const getEntryIndexById = entryId => {
        return entries.value.findIndex(entry => entryId === entry.id)
    }

    const removeSlideItemIfExists = entryId => {
      /*
        hacky fix: when deleting (after sorting),
        sometimes the slide item is not removed
        from the dom. this will remove the slide
        item from the dom if it still existir
        (after entry removed from entries array)
      */
      nextTick(() => {
        const slideItem = document.querySelector(`#id-${ entryId }`)
        if (slideItem) slideItem.remove()
      })
    }

    /* return */

    return {
        /* state */
        entries,
        options,

        /* getters */
        balance,
        balancePaid,
        runningBalances,

        /* actions */
        addEntry,
        deleteEntry,
        updateEntry,
        sortEnd,
        loadEntries
    }
})
