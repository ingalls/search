import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', {
    state: (): {
        name: string;
        code: string;
        startDate: string;
        description: string;
        aircraft: {
            enabled: Recrod<string, boolean>,
            regions: Array<{
                name: string;
                flightLength: number;
                searchLength: number;
                sweepWidth: number;
            }>
        }
    } => {
        const initial =  {
            name: '',
            code: '',
            type: 'aircraft',
            startDate: '',
            description: '',
            aircraft: {
                enabled: {},
                regions: []
            },
            ground: {

            }
        }

        if (localStorage.getItem("mission")) {
            Object.assign(initial, JSON.parse(localStorage.getItem("mission")))
        }

        return initial;
    }
})
