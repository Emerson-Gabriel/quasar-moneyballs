import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { Dark } from "quasar";

export const useStoreSettings = defineStore('settings', () => {

    /*
        state
    */
    const settings = reactive({
        promptToDelete: true,
        showRunningBalance: false,
        currencySimbol: '$',
        darkMode: false /* aqui tambem pode aceitar 'auto' */
    })

    watch(() => settings.darkMode, value => {
      Dark.set(value)
    }, { immediate: true })

    /*
        getters
    */

    /*
     actions
    */

    /* helpers */

    /* return */

    return {
        /* state */
        settings

        /* getters */

        /* actions */
    }
})
