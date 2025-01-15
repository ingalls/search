<template>
    <div class='page-body'>
        <div class='container-xl'>
            <div class='row row-deck row-cards'>
                <div class='col-lg-12'>
                    <div class='card'>
                        <div class='card-header d-flex'>
                            <h1 class='card-title'>
                                Search Probability of Success Calculator
                            </h1>

                            <div class='btn-list ms-auto'>
                                <div
                                    class='px-2 py-2 round btn-group w-100'
                                    role='group'
                                >
                                    <input
                                        id='plane'
                                        type='radio'
                                        class='btn-check'
                                        autocomplete='off'
                                        :checked='route.name === "aircraft"'
                                        @click='router.push("/aircraft")'
                                    >
                                    <label
                                        for='plane'
                                        type='button'
                                        class='btn btn-sm'
                                    ><IconPlane
                                        v-tooltip='"Aircraft Search"'
                                        :size='32'
                                        stroke='1'
                                    /></label>

                                    <input
                                        id='ground'
                                        type='radio'
                                        class='btn-check'
                                        autocomplete='off'
                                        :checked='route.name === "ground"'
                                        @click='router.push("/ground")'
                                    >
                                    <label
                                        for='ground'
                                        type='button'
                                        class='btn btn-sm'
                                    ><IconWalk
                                        v-tooltip='"Ground Search"'
                                        :size='32'
                                        stroke='1'
                                    /></label>
                                </div>
                            </div>
                        </div>
                        <div class='card-body'>
                            <TablerInput
                                v-model='search.name'
                                label='Search Name'
                            />

                            <TablerInput
                                v-model='search.description'
                                label='Search Description'
                                :rows='2'
                            />
                        </div>
                    </div>
                </div>

                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router';
import { useSearchStore } from '../stores/search.ts';
import {
    IconWalk,
    IconPlane
} from '@tabler/icons-vue'
import {
    TablerInput
} from '@tak-ps/vue-tabler'

const route = useRoute();
const router = useRouter();
const search = useSearchStore();
</script>
