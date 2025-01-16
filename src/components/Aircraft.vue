<template>
    <div>
        <div class='card-header d-flex'>
            <h1 class='card-title'>
                Aircraft Search Regions
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
                        <IconPlus
                            :size='32'
                            stroke='1'
                        />
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
                    v-for='(region, rid) in search.aircraft.regions'
                    :key='region.id'
                >
                    <div class='col-12 border rounded px-2 py-2 mb-2'>
                        <div class='row g-2'>
                            <div class='col-12 d-flex align-items-center'>
                                <label v-text='`Region ${indexToChar(rid)} - ${region.name || "No Name"}`' />
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
                            <div class='col-md-4'>
                                <TablerInput
                                    v-model='region.sweepWidth'
                                    label='Sweep Width (nm)'
                                    description='TODO'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class='card-footer d-flex'>
            <div class='ms-auto'>
                <button
                    :disabled='isValid'
                    class='btn btn-primary'
                    @click='router.push("/search/aircraft")'
                >
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
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

const isValid = computed(() => {
    return !search.aircraft.regions.length
});

function pushRegion() {
    search.aircraft.regions.push({
        name: '',
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
