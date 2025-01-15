<template>
    <div class='page-body'>
        <div class='container-xl'>
            <div class='row row-deck row-cards'>
                <div class='col-lg-12'>
                    <div class='card'>
                        <div class='card-header d-flex'>
                            <h1 class='card-title'>Search Mission</h1>

                            <div class='ms-auto'>
                                <div
                                    class='px-2 py-2 round btn-group w-100'
                                    role='group'
                                >
                                    <input
                                        id='plane'
                                        type='radio'
                                        class='btn-check'
                                        autocomplete='off'
                                        :checked='search.type === MissionType.AIRCRAFT'
                                        @click='search.type = MissionType.AIRCRAFT'
                                    >
                                    <label
                                        for='info'
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
                                        :checked='search.type === MissionType.GROUND'
                                        @click='search.type = MissionType.GROUND'
                                    >
                                    <label
                                        for='info'
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
                                label='Search Name'
                                v-model='search.name'
                            />

                            <TablerInput
                                label='Search Description'
                                v-model='search.description'
                                rows='2'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useSearchStore, MissionType } from '../stores/search.ts';
import {
    IconWalk,
    IconPlane
} from '@tabler/icons-vue'
import {
    TablerInput
} from '@tak-ps/vue-tabler'

const search = useSearchStore();
</script>
