<template>
    <div class='page h-100'>
        <router-view
            @err='err = $event'
        />
        <TablerError
            v-if='err'
            :err='err'
            @close='err = null'
        />
    </div>
</template>

<script lang='ts'>
import { watch, ref } from 'vue'
import '@tabler/core/dist/js/tabler.min.js';
import '@tabler/core/dist/css/tabler.min.css';
import { useProfileStore } from './stores/profile.ts';
import {
    TablerError,
    TablerLoading
} from '@tak-ps/vue-tabler';
import { std, stdurl } from './std.ts';

const err = ref<Error | undefined>();

onMounted(async () => {
    window.addEventListener('unhandledrejection', (e) => {
        this.err = e.reason;
    });
});
</script>

<style lang='scss'>
$cloudtak-yellow: #FFB703;
$cloudtak-orange: #FF9820;
$cloudtak-navy: #023047;
$cloudtak-blue: #07556D;

.hover-button-hidden {
    visibility: hidden;
}

.hover-button:hover .hover-button-hidden {
    visibility: visible;
}

.hover-light:hover {
    background: #f5f5f5;
}

.hover-button:hover {
    border-radius: 6px;
    background-color: rgba(0, 0, 0, 0.2);
}

.hover-dark:hover {
    background: #0f172a;
}
</style>
