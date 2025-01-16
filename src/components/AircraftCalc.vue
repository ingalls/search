<template>
    <div>
        <div class='card-header d-flex align-items-center'>
            <h1 class='card-title'>
                Aircraft Search Calculator
            </h1>

            <div v-if='search.aircraft.searches.length' class='ms-auto btn-list'>
                <TablerEnum
                    :default='searches[0]'
                    :options='searches'
                />
                <TablerIconButton
                    title='Add Search'
                    @click='pushSearch'
                >
                    <IconPlus :size='32' stroke='1'/>
                </TablerIconButton>
            </div>
        </div>

        <div class='card-body'>
            <TablerNone
                v-if='search.aircraft.searches.length === 0'
                label='Search'
                @create='pushSearch'
            />
            <template v-else>
                <div
                    class='row g-2 mb-3'
                    v-for='(region, rid) in search.aircraft.regions'
                >
                    <div class='col-md-3'>
                        <div class='subheader'>Region</div>
                        <div v-text='`${indexToChar(rid)} - ${region.name}`'></div>
                    </div>
                    <div class='col-md-3'>
                        <div class='subheader'>Flight Length (nm)</div>
                        <div v-text='region.flightLength'></div>
                    </div>
                    <div class='col-md-3'>
                        <div class='subheader'>Search Length (nm)</div>
                        <div v-text='region.searchLength'></div>
                    </div>
                    <div class='col-md-3'>
                        <div class='subheader'>Sweep Width (nm)</div>
                        <div v-text='region.sweepWidth'></div>
                    </div>
                    <div class='col-md-6'>
                        <label class='subheader'>Search Tracks</label>
                        <TablerInput
                            v-model='search.aircraft.searches[config.search].tracks'
                        />
                    </div>
                    <div class='col-md-6'>
                        <label class='subheader'>Search Segments</label>
                        <TablerInput
                            v-model='search.aircraft.searches[config.search].segments'
                        />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { watch, ref, computed, onMounted } from 'vue';
import { useSearchStore } from '../stores/search.ts';
import {
    IconPlus
} from '@tabler/icons-vue'
import {
    TablerIconButton,
    TablerDelete,
    TablerEnum,
    TablerNone,
    TablerInput
} from '@tak-ps/vue-tabler'

const search = useSearchStore();

const config = ref({
    search: search.aircraft.searches.length - 1
})

onMounted(() => {
    if (search.aircraft.searches.length === 0) {
        pushSearch();
    }
});

const searches = computed(() => {
    return search.aircraft.searches.map((_, i) => `Search ${i}`);
});

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

function pushSearch() {
    search.aircraft.searches.push({
        tracks: 1,
        segments: 0,
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
