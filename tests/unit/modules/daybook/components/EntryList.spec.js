import { shallowMount } from '@vue/test-utils'
import { createStore } from "vuex"

import EntryList from '@/modules/daybook/components/EntryList'
import journal from '@/modules/daybook/store/journal'
import { journalState } from '../../../mock-data/test-journal-state'
// import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters'

const createVuexStore = ( iniatalSatate ) => createStore({
    modules: {
        journal: { 
            ...journal,
            state: { ...iniatalSatate }
        }
    }
})

describe('Pruebas en el EntryList', () => {

    // const journalMockModule = {
    //     namespaced: true,
    //     getters: {
    //         getEntriesByTerm
    //     },
    //     state: () => ({
    //         isLoading: false,
    //         entries: journalState.entries
    //     })
    // }

    // const store = createStore({
    //     modules: {
    //         journal: { ...journalMockModule }
    //     }
    // })

    const store = createVuexStore( journalState )

    const mockRouter = {
        push: jest.fn()
    }
    
    let wrapper;
    beforeEach( () => {
        jest.clearAllMocks()
        wrapper = shallowMount( EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            }
        })

    })

    test('debe de llamar el getEntriesByTerm sin termino y mostrar 4 entradas ', () => {
        expect( wrapper.html() ).toMatchSnapshot()
        expect( wrapper.findAll('entry-stub').length ).toBe( 4 )
    })

    test('debe de llamar el getEntriesByTerm y filtrar las entradas', async () => {
        const input = wrapper.find('input')
        await input.setValue('imagen')

        expect( wrapper.findAll('entry-stub').length ).toBe(1)
    })

    test('el boton de nuevo debe de redireccionar a /new', () => {
        wrapper.find('button').trigger('click')
        expect( mockRouter.push ).toHaveBeenCalledWith({name: 'entry', params: {id: 'new'}})
    })

})