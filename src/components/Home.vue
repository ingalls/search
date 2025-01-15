<template>
    <div class='page-body'>
        <div class='container-xl'>
            <div class='row row-deck row-cards'>
                <div class='col-lg-12 d-flex align-items-center justify-content-center'>
                    <IconMapSearch :size='32' stroke='1'/><span class='mx-2'>Search Probability of Success</span>
                </div>
                <div class='col-lg-12'>
                    <div class='card'>
                        <div class='row g-0' >
                            <div class='col-12 col-md-3 border-end'>
                                <div class='card-body'>
                                    <div class='col-12 d-flex align-items-center'>
                                        <h4 class='subheader user-select-none'>
                                            Search PoS
                                        </h4>

                                        <div class='btn-list ms-auto'>
                                        </div>
                                    </div>
                                    <div
                                        role='menu'
                                        class='list-group list-group-transparent'
                                    >
                                        <span
                                            tabindex='0'
                                            role='menuitem'
                                            class='list-group-item list-group-item-action d-flex align-items-center user-select-none'
                                            :class='{
                                                "active": String(route.name) === "home",
                                                "cursor-pointer": String(route.name) !== "home"
                                            }'
                                            @click='$router.push(`/search`)'
                                        >
                                            <IconHome
                                                :size='32'
                                                stroke='1'
                                            /><span class='mx-3'>Setup</span>
                                        </span>
                                        <template v-if='isValid && search.type === "aircraft"'>
                                            <span
                                                v-if='search.aircraft.enabled["regions"]'
                                                tabindex='0'
                                                role='menuitem'
                                                class='list-group-item list-group-item-action d-flex align-items-center user-select-none'
                                                :class='{
                                                    "active": String(route.name) === "aircraft-regions",
                                                    "cursor-pointer": String(route.name) !== "aircraft-regions"
                                                }'
                                                @click='$router.push(`/search/aircraft/regions`)'
                                            >
                                                <IconMap
                                                    :size='32'
                                                    stroke='1'
                                                /><span class='mx-3'>Regions</span>
                                            </span>
                                            <span
                                                v-if='search.aircraft.enabled["calc"]'
                                                tabindex='0'
                                                role='menuitem'
                                                class='list-group-item list-group-item-action d-flex align-items-center user-select-none'
                                                :class='{
                                                    "active": String(route.name) === "aircraft-calc",
                                                    "cursor-pointer": String(route.name) !== "aircraft-calc"
                                                }'
                                                @click='$router.push(`/search/aircraft/calc`)'
                                            >
                                                <IconCalculator
                                                    :size='32'
                                                    stroke='1'
                                                /><span class='mx-3'>Calculator</span>
                                            </span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class='col-12 col-md-9 position-relative'>
                                <template v-if='route.name === "home"'>
                                    <div class='card-header'>
                                        Search Setup
                                    </div>
                                    <div class='row g-2 mx-2 mb-2'>
                                        <div class='col-md-8'>
                                            <TablerInput
                                                v-model='search.name'
                                                label='Search Name'
                                            />
                                        </div>
                                        <div class='col-md-4'>
                                            <TablerInput
                                                v-model='search.code'
                                                label='Search Code'
                                            />
                                        </div>
                                        <div class='col-md-12'>
                                            <TablerInput
                                                v-model='search.startDate'
                                                type='datetime-local'
                                                label='Start Date'
                                            />
                                        </div>
                                        <div class='col-12'>
                                            <TablerInput
                                                v-model='search.description'
                                                label='Search Description'
                                                :rows='2'
                                            />
                                        </div>

                                        <div class='col-12'>
                                            <label class='mx-2'>Search Type</label>

                                            <div class='col-12'>
                                                <label
                                                    for='plane-type'
                                                    type='button'
                                                    @click='search.type = "aircraft"'
                                                    style='width: 50%;'
                                                    :class='{
                                                        "btn-primary": search.type === "aircraft"
                                                    }'
                                                    class='btn btn-sm'
                                                ><IconPlane
                                                    v-tooltip='"Aircraft Search"'
                                                    :size='32'
                                                    stroke='1'
                                                /></label>

                                                <label
                                                    for='ground-type'
                                                    type='button'
                                                    style='width: 50%;'
                                                    @click='search.type = "ground"'
                                                    :class='{
                                                        "btn-primary": search.type === "ground"
                                                    }'
                                                    class='btn btn-sm'
                                                ><IconWalk
                                                    v-tooltip='"Ground Search"'
                                                    :size='32'
                                                    stroke='1'
                                                /></label>
                                            </div>
                                        </div>
                                    </div>

                                    <div class='card-footer d-flex'>
                                        <div class='ms-auto'>
                                            <button
                                                :disabled='!isValid'
                                                class='btn btn-primary'
                                                @click='clickNext'
                                            >Next</button>
                                        </div>
                                    </div>
                                </template>
                                <router-view
                                    v-else
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSearchStore } from '../stores/search.ts';
import {
    IconCalculator,
    IconMapSearch,
    IconWalk,
    IconHome,
    IconPlane,
    IconMap,
} from '@tabler/icons-vue'
import {
    TablerInput
} from '@tak-ps/vue-tabler'

const isValid = computed(() => {
    return search.name.length
        && search.code.length
        && search.startDate.length
        && search.description.length
        && search.type.length
});

const route = useRoute();
const router = useRouter();
const search = useSearchStore();

function clickNext() {
    search.aircraft.enabled["regions"] = true;

    if (search.type === "aircraft") {
        router.push("/search/aircraft/regions")
    }
}
</script>
