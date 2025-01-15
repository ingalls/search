import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
    state: (): {
        name: string;
        description: string;
        aircraft: {
            regions: Array<{
                flightLength: number;
                searchLength: number;
                sweepWidth: number;
            }>
        }
    } => {
        return {
            name: '',
            description: '',
            aircraft: {
                regions: []
            },
            ground: {

            }
        }
    },
})
