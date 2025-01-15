<template>
    <div class='col-lg-12'>
        <div class='card'>
            <div class='card-header d-flex'>
                <h1 class='card-title'>
                    Ground Search
                </h1>
            </div>
            <div class='card-body'>
                <TablerAlert
                    title='Not Implemented'
                    :err='new Error("This feature has yet to be implemented")'
                    :advanced='false'
                />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import {
    TablerAlert
} from '@tak-ps/vue-tabler'
</script>
