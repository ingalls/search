import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
    state: (): {
        name: string;
        code: string;
        startDate: string;
        description: string;
        aircraft: {
            regions: Array<{
                name: string;
                flightLength: number;
                searchLength: number;
                sweepWidth: number;
            }>
        }
    } => {
        return {
            name: '',
            code: '',
            type: 'aircraft',
            startDate: '',
            description: '',
            aircraft: {
                regions: []
            },
            ground: {

            }
        }
    },
})
