<template>
    <TablerModal size='xl'>
        <div class='modal-status bg-blue' />
        <button
            type='button'
            class='btn-close'
            aria-label='Close'
            @click='$emit("close")'
        />

        <div class='modal-header'>
            <div class='modal-title'>Sweep Width Calculator</div>
        </div>

    </TablerModal>

</template>

<script setup lang='ts'>
import {
    TablerModal
} from '@tak-ps/vue-tabler'
</script>
