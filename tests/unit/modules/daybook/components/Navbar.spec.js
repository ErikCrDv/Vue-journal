import { shallowMount } from '@vue/test-utils'
import Navbar from '@/modules/daybook/components/Navbar'
import createVuexStore from '../../../mock-data/mock-store'


const mockRouter = {
    push: jest.fn()
}

jest.mock('vue-router', () => ({
    useRouter: () => mockRouter
}))


describe('Pruebas en el Navbar Component', () => {
    const store = createVuexStore({
        user: {
            name:'Erik',
            email: 'erik@cordova.com'
        },
        status: 'authenticated',
        idToken: 'ABC',
        refreshToken: 'XYZ'
    })


    beforeEach( () => jest.clearAllMocks() )

    test('debe de mostrar el componente correctamente', () => {
        const wrapper = shallowMount( Navbar, {
            global: {
                plugins: [ store ]
            }
        })
        
        expect( wrapper.html() ).toMatchSnapshot()
    })

    // test('click en logout, debe de cerrar sesion y redireccionar', async () => {
    //     const wrapper = shallowMount( Navbar, {
    //         global: {
    //             plugins: [ store ]
    //         }
    //     })

    //     await wrapper.find('button').trigger('click')

    //     expect( mockRouter.push ).toBeCalledWith({"name": "login"})
    //     expect( store.state.auth ).toEqual( {
    //         user: null,
    //         status: 'not-authenticated',
    //         idToken: null,
    //         refreshToken: null
    //     })
    // })
})