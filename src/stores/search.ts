import { defineStore } from 'pinia';

export enum MissionType {
    AIRCRAFT = 'aircraft',
    GROUND = 'ground'
};

export const useSearchStore = defineStore('search', {
    state: (): {
        type: MissionType;
        name: string;
        description: string;
    } => {
        return {
            type: MissionType.AIRCRAFT,
            name: '',
            description: '',
            aircraft: {

            },
            ground: {

            }
        }
    },
})
