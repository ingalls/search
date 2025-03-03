<template>
    <div>
        <div class='card-header d-flex'>
            <h1 class='card-title'>
                Aircraft Search Regions
            </h1>
            <div class='btn-list ms-auto'>
                <TablerIconButton
                    title='New Region'
                    @click='pushRegion'
                >
                    <IconPlus
                        :size='32'
                        stroke='1'
                    />
                </TablerIconButton>
            </div>
        </div>
        <div class='card-body'>
            <TablerNone
                v-if='search.aircraft.regions.length === 0'
                label='Region'
                @create='pushRegion'
            />
            <template v-else>
                <div
                    v-for='(region, rid) in search.aircraft.regions'
                    :key='region.id'
                >
                    <div class='col-12 border rounded px-2 py-2 mb-2'>
                        <div class='row g-2'>
                            <div class='col-12 d-flex align-items-center'>
                                <div class='col'>
                                    <div v-text='`${region.name || "No Name"}`' />
                                    <div class='subheader' v-text='`Region ${indexToChar(rid)}`'/>
                                </div>
                                <div class='btn-list ms-auto'>
                                    <TablerDelete
                                        displaytype='icon'
                                        @delete='search.aircraft.regions.splice(rid, 1)'
                                    />
                                </div>
                            </div>
                            <div class='col-md-12'>
                                <TablerInput
                                    v-model='region.name'
                                    label='Region Name'
                                    description='The full non-coded name of a given region'
                                    placeholder='Gondor'
                                />
                            </div>
                            <div class='col-md-4'>
                                <TablerInput
                                    v-model='region.flightLength'
                                    label='Flight Length (nm)'
                                    description='The length of the flight from Last Known Point (LKP) to destination in nautical miles'
                                    @update:model-value='region.searchLength = $event + 20'
                                />
                            </div>
                            <div class='col-md-4'>
                                <TablerInput
                                    v-model='region.searchLength'
                                    label='Search Length (nm)'
                                    description='The length of the flight from Last Known Point (LKP) to destination + search before LKP and after destination - defaults to +/- 10nm on each side'
                                />
                            </div>
                            <div class='col-md-4 d-flex'>
                                <TablerInput
                                    v-model='region.sweepWidth'
                                    label='Sweep Width'
                                    description='Effective search area from aircraft at a given height over given terrain'
                                />
                                <TablerIconButton
                                    title='Sweep Width Calculator'
                                    style='margin-top: 30px; margin-left: 8px;'
                                    class='btn btn-sm'
                                    @click='state.modal = true'
                                >
                                    <IconCalculator stroke='1' />
                                </TablerIconButton>
                            </div>
                        </div>
                    </div>
                    <SweepCalculator
                        v-if='state.modal'
                        @select='updateSweep(region, $event)'
                        @close='state.modal = false'
                    />
                </div>
            </template>
        </div>
        <div class='card-footer d-flex'>
            <div class='ms-auto'>
                <button
                    :disabled='!isValid'
                    class='btn btn-primary'
                    @click='clickNext'
                >
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useSearchStore } from '../stores/search.ts';
import SweepCalculator from './AircraftRegionsSweepWidth.vue';
import {
    IconPlus,
    IconCalculator
} from '@tabler/icons-vue'
import {
    TablerIconButton,
    TablerDelete,
    TablerNone,
    TablerInput
} from '@tak-ps/vue-tabler'

const search = useSearchStore();
const router = useRouter();

const state = ref({
    modal: false
})

const isValid = computed(() => {
    if (!search.aircraft.regions.length) return false;

    for (const region of search.aircraft.regions) {
        if (
            !region.name.length
            || isNaN(region.flightLength)
            || isNaN(region.searchLength)
            || isNaN(region.sweepWidth)
        ) return false;
    }

    return true;
});

function pushRegion() {
    search.aircraft.regions.push({
        name: '',
        flightLength: 0,
        searchLength: 0,
        sweepWidth: 0,
    })
}

function updateSweep(region, sweep) {
    region.sweepWidth = sweep;
    state.value.modal = false;
}

function clickNext() {
    search.aircraft.enabled["calc"] = true;
    router.push('/search/aircraft/calc');
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
