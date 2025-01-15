<template>
    <div>
        <div class='card-header d-flex'>
            <h1 class='card-title'>
                Aircraft Calculator
            </h1>
        </div>
        <TablerNone
            v-if='search.aircraft.regions.length === 0'
            label='Region'
        />
        <template v-else>
            <div class='table-responsive'>
                <table class="table table-vcenter card-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Flight Length (nm)</th>
                            <th scope="col">Search Length (nm)</th>
                            <th scope="col">Sweep Width (nm)</th>
                            <th scope="col">Tracks</th>
                            <th scope="col">Segments</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for='(region, rid) in search.aircraft.regions'>
                            <th v-text='`${rid} - ${region.name}`'/>
                            <td v-text='region.flightLength'/>
                            <td v-text='region.searchLength'/>
                            <td v-text='region.sweepWidth'/>
                            <td>
                                <TablerInput
                                    v-model='region.tracks'
                                />
                            </td>
                            <td>
                                <TablerInput
                                    v-model='region.segments'
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>

        <template v-if='true'>
            <div class='table-responsive'>
                <table class="table table-vcenter card-table">
                    <tbody>
                        <tr>
                            <td>Fuel Limited Time</td>
                            <td>
                                <TablerInput

                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Daylight Limited Time</td>
                            <td>
                                <TablerInput

                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Observer Endurance</td>
                            <td>
                                <TablerInput

                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Search Endurance</td>
                            <td>
                                <TablerInput

                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Search Speed</td>
                            <td>
                                <TablerInput

                                />
                            </td>
                        </tr>

                        <tr>
                            <td>SRU Mileage</td>
                            <td>
                                <TablerInput

                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Track Portion</td>
                            <td>
                                <TablerInput

                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Search Length</td>
                            <td>
                                <TablerInput

                                />
                            </td>
                        </tr>

                        <tr>
                            <td>Number Tracks</td>
                            <td>
                                <TablerInput

                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
    </div>
</template>

<script setup lang='ts'>
import { watch, ref, computed } from 'vue';
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
