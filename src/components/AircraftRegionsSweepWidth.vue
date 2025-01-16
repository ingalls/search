<template>
    <TablerModal size='xl'>
        <div class='modal-status bg-blue' />
        <button
            type='button'
            class='btn-close'
            aria-label='Close'
            @click='emit("close")'
        />

        <div class='modal-header'>
            <div class='modal-title'>Sweep Width Calculator</div>
        </div>
        <div class='modal-body'>
            <div class='row g-2'>
                <div class='col-md-12'>
                    <TablerEnum
                        label='Search Object'
                        v-model='userSelection.object'
                        :options='Object.keys(dataTable)'
                    />
                </div>
                <div class='col-md-12'>
                    <TablerEnum
                        label='Vegetation/Terrain Correction'
                        v-model='userSelection.vegetation'
                        :options='corrections'
                    />
                </div>
                <div class='col-md-12'>
                    <TablerEnum
                        label='Height AGL'
                        v-model='userSelection.height'
                        :options='heights'
                    />
                </div>
                <div class='col-md-12'>
                    <TablerEnum
                        label='Visibility'
                        v-model='userSelection.visibility'
                        :options='visibilities'
                    />
                </div>
                <div class='col-md-12'>
                    <label class='mx-2'>Computed Sweep Value</label>
                    <pre v-text='calc'/>
                </div>
            </div>
        </div>
            <div class='modal-footer'>
                <button class='btn'
                    @click='emit("close")'
                >Cancel</button>

                <div class='ms-auto'>
                    <button
                        @click='emit("select", calc)'
                        class='btn btn-primary'
                    >Select</button>
                </div>
            </div>
    </TablerModal>
</template>

<script setup lang='ts'>
import { ref, computed, watch } from 'vue';
import {
    TablerModal,
    TablerEnum
} from '@tak-ps/vue-tabler'

const emit = defineEmits(["close", 'select'])

const calc = computed(() => {
    const cor = corrections.indexOf(userSelection.value.vegetation);
    const hgt = heights.fn().indexOf(userSelection.value.height);
    const viz = visibilities.indexOf(userSelection.value.visibility);

    return dataTable[userSelection.value.object].widths[hgt][viz]
        * dataTable[userSelection.value.object].corrections[cor];
});

const corrections = [
    "0-15% Vegetation",
    "15-60% Vegetation or Hilly",
    "60-80% Vegetation or Mountainous",
    "85-100% Vegetation",
];

const visibilities = [
    "3.5 NM (3.5 miles)",
    "5 NM (5.8 miles)",
    "10 NM (11.5 miles)",
    "15 NM (17.3 miles)",
    "20 NM (23.0 miles)"
]

const dataTable = {
    "Person": {
        // By Index of corrections array above
        corrections: [1.0, 0.5, 0.3, 0.1],
        // By Altitude index and then element by viz index
        widths: [
            [0.4, 0.4, 0.5, 0.5, 0.5],
            [0.4, 0.4, 0.5, 0.5, 0.5]
        ]
    },
    "Vehicle": {
        corrections: [1.0, 0.7, 0.4, 0.1],
        widths: [
            [0.9, 1.3, 1.3, 1.3, 1.3],
            [1.0, 1.4, 1.4, 1.5, 1.5],
            [1.0, 1.4, 1.7, 1.7, 1.7],
            [1.0, 1.5, 2.0, 2.0, 2.0]
        ]
    },
    "Aircraft Under 12500lbs": {
        corrections: [1.0, 0.7, 0.4, 0.1],
        widths: [
            [1.0, 1.4, 1.4, 1.4, 1.4],
            [1.0, 1.5, 1.5, 1.6, 1.6],
            [1.0, 1.5, 1.8, 1.8, 1.8],
            [1.0, 1.6, 2.0, 2.0, 2.0]
        ]
    },
    "Aircraft Over 12500lbs": {
        corrections: [1.0, 0.8, 0.4, 0.1],
        widths: [
            [1.2, 2.0, 2.2, 2.2, 2.2],
            [1.8, 2.7, 3.0, 3.0, 3.0],
            [2.0, 2.8, 3.2, 3.2, 3.2],
            [2.2, 2.9, 3.5, 3.5, 3.5]
        ]
    }
}

const userSelection = ref({
    object: Object.keys(dataTable)[0],
    vegetation: corrections[0],
    height: '500 ft',
    visibility: visibilities[0]
})

const heights = computed(() => {
    if (userSelection.value.object === "Person") {
        return ["500 ft", "1000 ft"];
    } else {
        return ["500 ft", "1000 ft", "1500 ft", "2000 ft"];
    }
});

</script>
