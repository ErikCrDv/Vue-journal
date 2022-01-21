import { shallowMount } from '@vue/test-utils'
import AboutView from '@/views/About'

describe('Prueba en el About View', () => {
    let wrapper;
    beforeEach( () => {
        wrapper = shallowMount( AboutView )
    })

    test('debe de renderizar el componente correctamente', () => {
        expect( wrapper.html() ).toMatchSnapshot()
    })
})