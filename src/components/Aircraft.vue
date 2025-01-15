<template>
    <div class='col-lg-12'>
        <div class='card'>
            <div class='card-header d-flex'>
                <h1 class='card-title'>
                    Aircraft Search
                </h1>
            </div>
            <div class='card-body'>
                <div class='col-12 d-flex align-items-center mb-1'>
                    Regions

                    <div class='btn-list ms-auto'>
                        <TablerIconButton
                            title='New Region'
                            @click='pushRegion'
                        >
                            <IconPlus :size='32' stroke='1'/>
                        </TablerIconButton>
                    </div>
                </div>

                <TablerNone
                    v-if='search.aircraft.regions.length === 0'
                    label='Region'
                    @create='pushRegion'
                />
                <template v-else>
                    <div
                        :key='region.id'
                        v-for='(region, rid) in search.aircraft.regions'
                    >
                        <div class='col-12 border rounded px-2 py-2 mb-2'>
                            <div class='row g-2'>
                                <div class='col-12 d-flex align-items-center'>
                                    <label v-text='`Region ${indexToChar(rid)}`'/>
                                    <div class='btn-list ms-auto'>
                                        <TablerDelete
                                            displaytype='icon'
                                            @delete='search.aircraft.regions.splice(rid, 1)'
                                        />
                                    </div>
                                </div>
                                <div class='col-md-4'>
                                    <TablerInput
                                        label='Flight Length (nm)'
                                        description='The length of the flight from Last Known Point (LKP) to destination in nautical miles'
                                        @update:modelValue='region.searchLength = $event + 20'
                                        v-model='region.flightLength'
                                    />
                                </div>
                                <div class='col-md-4'>
                                    <TablerInput
                                        label='Search Length (nm)'
                                        description='The length of the flight from Last Known Point (LKP) to destination + search before LKP and after destination - defaults to +/- 10nm on each side'
                                        v-model='region.searchLength'
                                    />
                                </div>
                                <div class='col-md-4'>
                                    <TablerInput
                                        label='Sweep Width (nm)'
                                        description='TODO'
                                        v-model='region.sweepWidth'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { watch } from 'vue';
import { useSearchStore } from '../stores/search.ts';
import {
    IconPlus
} from '@tabler/icons-vue'
import {
    TablerIconButton,
    TablerDelete,
    TablerNone,
    TablerInput
} from '@tak-ps/vue-tabler'

const search = useSearchStore();

function pushRegion() {
    search.aircraft.regions.push({
        flightLength: 0,
        searchLength: 0,
        sweepWidth: 0
    })
}

function indexToChar(index: number): string {
    let result = '';
    while (index >= 0) {
        result = String.fromCharCode((index % 26) + 65) + result;
        index = Math.floor(index / 26) - 1;
    }
    return result;
}
</script>
