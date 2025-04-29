import { defineStore } from "pinia";
import { reactive, watch } from "vue";
import { Dark, LocalStorage } from "quasar";

export const useStoreSettings = defineStore('settings', () => {

    /*
        state
    */
    const settings = reactive({
        /* qui temos as configurações padrão ao abrir a aplicação */
        promptToDelete: true,
        showRunningBalance: false,
        currencySimbol: '$',
        darkMode: true /* aqui tambem pode aceitar 'auto' que irá capturar o padrão do navegador */
    })

    /* watch darkMode */
    watch(() => settings.darkMode, value => {
      Dark.set(value)
    }, { immediate: true })

    /*
      watch settings
      aqui estamos atribuindo um watch para monitorar a variavel settings (confg do sistema)
    */
    watch(settings, () => {
      saveSettings()
    })

    /*
        getters
    */

    /*
     actions
    */

    const saveSettings = () => {
      LocalStorage.set('settings', settings)
    }

    const loadSettings = () => { 
      const savedSettings = LocalStorage.getItem('settings')
      if (savedSettings) Object.assign(settings, savedSettings)
    }

    /* helpers */

    /* return */

    return {
        /* state */
        settings,

        /* getters */

        /* actions */
        loadSettings
    }
})
