import { shallowMount } from '@vue/test-utils'
import Entry from '@/modules/daybook/components/Entry'
import { journalState } from '../../../mock-data/test-journal-state'
 
describe('Pruebas en el entry componente', () => {

    const mockRouter = {
        push: jest.fn()
    }

    const wrapper = shallowMount( Entry, {
        props: {
            entry: journalState.entries[0]
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })

    test('debe de hacer match con el snapshot', () => {
       expect( wrapper.html() ).toMatchSnapshot()
    })

    test('debe de redireccionar al hacer click en el entry-container', () => {
        const eContainer = wrapper.find('.entry-container')
        eContainer.trigger('click')
        expect( mockRouter.push ).toHaveBeenCalledWith({name: 'entry', params: {id: journalState.entries[0].id}})
    })

    test('pruebas en las propiedades computadas', () => {
        expect(wrapper.vm.day).toBe(30) 
        expect(wrapper.vm.month).toBe('Diciembre') 
        expect(wrapper.vm.yearDay).toBe('2021, Jueves') 
    })
})