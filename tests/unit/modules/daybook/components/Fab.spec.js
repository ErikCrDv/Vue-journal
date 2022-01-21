import { shallowMount } from '@vue/test-utils'
import FabComponent from '@/modules/daybook/components/Fab'

describe('Pruebas en el Fab Component', () => {
    // let wrapper;
    // beforeEach(() => {
    //     wrapper = shallowMount( FabComponent )
    // })

    test('debe de mostrar el icono por defecto', () => {
        const wrapper = shallowMount( FabComponent )
        const iTag = wrapper.find('i')
        expect( iTag.classes('fa-plus') ).toBeTruthy()
    })

    test('debe de mostrar el icono por argumento', () => {
        const wrapper = shallowMount( FabComponent, {
            props: {
                icon: 'fa-circle'
            }
        } )
        const iTag = wrapper.find('i')
        expect( iTag.classes('fa-circle') ).toBeTruthy()
    })

    test('debe de emitir el evento on:Click al hacer click', () => {
        const wrapper = shallowMount( FabComponent )
        const btn  = wrapper.find('button')
        btn.trigger('click')

        console.log(wrapper.emitted());
        expect( wrapper.emitted('on:click') ).toHaveLength(1)
    })


})