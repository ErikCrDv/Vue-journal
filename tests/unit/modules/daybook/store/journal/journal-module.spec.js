import { createStore } from "vuex"
import journal from '@/modules/daybook/store/journal'
import { journalState } from "../../../../mock-data/test-journal-state"
import authApi from '@/api/authApi'

const createVuexStore = ( iniatalSatate ) => createStore({
    modules: {
        journal: { 
            ...journal,
            state: { ...iniatalSatate }
        }
    }
})

describe('Vuex - Prueba en el Journal Module', () => {

    beforeAll( async () => {
        const { data } = await authApi.post(':signInWithPassword', {
            email: 'test@test.com',
            password: '123456',
            returnSecureToken: true
        })

        localStorage.setItem('idToken', data.idToken)
    } )

    test('este es el estado inicial, deve de tener este state', () => {
        const store = createVuexStore( journalState )
        const { isLoading, entries } = store.state.journal

        expect( isLoading ).toBeFalsy()
        expect( entries ).toEqual( journalState.entries )
    })





    // Mutations 
    test('mutation: setEntries', () => {
        const store = createVuexStore({ isLoading: true, entries: []})
        store.commit('journal/setEntries', journalState.entries)

        expect( store.state.journal.isLoading ).toBeFalsy()
        expect( store.state.journal.entries.length ).toBe(4)
    })

    test('mutation: updateEntries', () => {
        const store = createVuexStore( journalState )

        const updateEntry = {
            "id": "-MsBdVlkVA5GF6UUz-qQ",
            "date" : 1640889708725,
            "picture" : "https://res.cloudinary.com/erikcrdv/image/upload/v1640889715/curso-vue/tmewkh2sf9hghhnapryo.jpg",
            "text" : "Hola Mundo"
        }

        store.commit('journal/updateEntry', updateEntry)

        const storeEntries = store.state.journal.entries
        expect( storeEntries.length ).toBe(4)
        expect( storeEntries ).toContainEqual( updateEntry )

        expect( storeEntries.find(e => e.id === updateEntry.id) ).toEqual( updateEntry )
    })

    test('mutation: add-delete-Entries', () => {
        const store = createVuexStore( journalState )

        const addEntry = {
            "id": "ABC-123",
            "text" : "Hola Mundo"
        }

        store.commit('journal/addEntry', addEntry)

        const storeEntries = store.state.journal.entries
        expect( storeEntries.length ).toBe(5)
        expect( storeEntries ).toContainEqual( addEntry )
        expect( storeEntries.find(e => e.id === addEntry.id) ).toBeTruthy()
        
        
        store.commit('journal/deleteEntry', addEntry.id)
        expect( storeEntries.length ).toBe(4)
        expect( storeEntries.find(e => e.id === addEntry.id) ).toBeFalsy()



    })






    // Getters

    test('getters: getEntriesByTerm getEntriesById', () => {
        const store = createVuexStore( journalState )
        const [ entry1, , ,  ] = journalState.entries

        expect( store.getters['journal/getEntriesByTerm']('').length ).toBe(4)
        expect( store.getters['journal/getEntriesByTerm']('imagen').length ).toBe(1)
        expect( store.getters['journal/getEntriesByTerm']('imagen') ).toEqual( [entry1] )
        
        
        expect( store.getters['journal/getEntriesById']('-MsBbgdZYEufO2RTCpzP') ).toEqual(entry1)
    })





    // Actions
    test('actions: loadEntries', async () => {
        const store = createVuexStore({ isLoading: true, entries: []})

        await store.dispatch('journal/loadEntries')
        expect( store.state.journal.entries.length ).toBe(4)
    })

    test('actions: updateEntry', async () => {
        const store = createVuexStore( journalState )
        // const store = createVuexStore({ isLoading: true, entries: []})

        const updatedEntry =         {
            "id": "-MsBbgdZYEufO2RTCpzP",
            "date" : 1640889229742,
            "text" : "Prueba de entrada con imagen desde Jest",
            "otroCampo": true
        }

        await store.dispatch('journal/updateEntry', updatedEntry)
        expect( store.state.journal.entries.length ).toBe(4)
        expect( 
            store.state.journal.entries.find(e => e.id === updatedEntry.id) 
        ).toEqual( {
            "id": "-MsBbgdZYEufO2RTCpzP",
            "date" : 1640889229742,
            "text" : "Prueba de entrada con imagen desde Jest",
        } )
    })

    test('actions: createEntry deleteEntry', async () => {
        const store = createVuexStore( journalState )

        const newEntry = {
            "date" : 1640889229742,
            "text" : "Nueva entrada",
        }

        const id = await store.dispatch('journal/createEntry', newEntry)
        expect( typeof id ).toBe('string')
        expect( store.state.journal.entries.length ).toBe(5)
        expect( 
            store.state.journal.entries.find(e => e.id === id) 
        ).toBeTruthy()

        await store.dispatch('journal/deleteEntry', id)
        expect( store.state.journal.entries.length ).toBe(4)
        expect( 
            store.state.journal.entries.find(e => e.id === id) 
        ).toBeFalsy()
        
    })

})