
import { shallowMount } from '@vue/test-utils'
import Login from '@/modules/auth/views/Login'
import createVuexStore from '../../../mock-data/mock-store'
import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))



describe('Pruebas en el Login Componente' , () => {

    const store = createVuexStore({
        user: null,
        status: 'not-authenticated',
        idToken: null,
        refreshToken: null
    })

    store.dispatch = jest.fn()
    beforeEach( () => jest.clearAllMocks() )
    

    test('debe de hacer match con el snapshot', () => {
        const wrapper = shallowMount( Login, {
            global: {
                plugins: [ store ]
            }
        })
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('credenciales incorrectas disparan el error', async () => {
        store.dispatch.mockReturnValueOnce({ok: false, message: 'Error en credenciales'})
        const wrapper = shallowMount( Login, {
            global: {
                plugins: [ store ]
            }
        })

        await wrapper.find('form').trigger('submit')
        expect( store.dispatch ).toBeCalledWith("auth/signInUser", {"email": "", "password": ""})
        expect( Swal.fire ).toHaveBeenCalledWith("Error", "Error en credenciales", "error")
    })

    test('credenciales correctas disparan el router', async () => {
        store.dispatch.mockReturnValueOnce({ok: true})
        const wrapper = shallowMount( Login, {
            global: {
                plugins: [ store ]
            }
        })

        const [ txtEmail, txtPasswprd ] = wrapper.findAll('input')

        await txtEmail.setValue('Erik@Cordova.com')
        await txtPasswprd.setValue('ABC123')
        await wrapper.find('form').trigger('submit')

        expect( store.dispatch ).toBeCalledWith("auth/signInUser", {email: 'Erik@Cordova.com', password: 'ABC123'})
        expect( wrapper.router.push ).toHaveBeenCalledWith({name: 'no-entry'})
        // wrapper.vm.loginForm
    })

})