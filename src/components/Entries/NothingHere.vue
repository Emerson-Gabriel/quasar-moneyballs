<template>
    <div class="text-center q-pt-xl">
        <q-icon
            name="savings"
            size="100px"
            color="grey-4"
            :color="useLightOrDark('grey-4', 'grey-9')"
        />
        <div
          class="text-grey-5"
          :color="useLightOrDark('text-grey', 'text-grey-7')"
        >
            No entries yet
        </div>
    </div>
</template>

<script setup>
  import { useLightOrDark } from 'src/use/useLightOrDark';
</script>


FEZ ATÉ O MÓDULO 15 CONTINUE NO 15
