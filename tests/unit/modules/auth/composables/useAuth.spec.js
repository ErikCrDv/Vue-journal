import useAuth from '@/modules/auth/composables/useAuth'

const mockStore = {
    dispatch: jest.fn(),
    commit: jest.fn(),
    getters: {
        'auth/currentState': 'authenticated',
        'auth/username': 'Erik'
    }
}
jest.mock('vuex', () => ({
    useStore: () => mockStore
}))

describe('Pruebas en useAuth', () => {
    beforeEach( () => jest.clearAllMocks() )

    test('createUser exitoso', async () => {

        const { createUser } = useAuth()
        const newUser = {name: 'Erik', email: 'erik@cordova.com', password: 'abc123'}

        mockStore.dispatch.mockReturnValue({ok: true})
        const res = await createUser( newUser )
        expect( mockStore.dispatch ).toHaveBeenCalledWith("auth/createUser", {"email": "erik@cordova.com", "name": "Erik", password: 'abc123'})
        expect( res ).toEqual({ok: true})
    })

    test('createUser fallido, el email ya existe', async () => {

        const { createUser } = useAuth()
        const newUser = {name: 'Erik', email: 'erik@cordova.com', password: 'abc123'}

        mockStore.dispatch.mockReturnValue({ok: false, message: 'EMAIL_EXISTS'})
        const res = await createUser( newUser )

        expect( mockStore.dispatch ).toHaveBeenCalledWith("auth/createUser", {name: "Erik", email: "erik@cordova.com", password: 'abc123'})
        expect( res ).toEqual({ok: false, message: 'EMAIL_EXISTS'})
    })

    test('login exitoso', async () => {

        const { loginUser } = useAuth()
        const loginForm = {email: 'erik@cordova.com', password: 'abc123'}

        mockStore.dispatch.mockReturnValue({ok: true})
        const res = await loginUser( loginForm )

        expect( mockStore.dispatch ).toHaveBeenCalledWith("auth/signInUser", loginForm)
        expect( res ).toEqual({ok: true})
    })

    test('login fallido', async () => {

        const { loginUser } = useAuth()
        const loginForm = {email: 'erik@cordova.com', password: 'abc123'}

        mockStore.dispatch.mockReturnValue({ok: false, message: 'EMAIL/PASSWORD do not exists'})
        const res = await loginUser( loginForm )

        expect( mockStore.dispatch ).toHaveBeenCalledWith("auth/signInUser", loginForm)
        expect( res ).toEqual({ok: false, message: 'EMAIL/PASSWORD do not exists'})
    })

    test('checkAuthStatus', async () => {

        const { checkAuthStatus } = useAuth()

        mockStore.dispatch.mockReturnValue({ok: true})
        const res = await checkAuthStatus()

        expect( mockStore.dispatch ).toHaveBeenCalledWith('auth/checkAuthentication')
        expect( res ).toEqual({ok: true})
    })
    
    test('logout', async () => {
        const { logout } = useAuth()
        
        await logout()
        expect( mockStore.commit ).toHaveBeenCalledWith('auth/logout')
        expect( mockStore.commit ).toHaveBeenCalledWith('journal/clearEntries')
    })

    test('Computed: authState, username', () => {
        const { authStatus, username } = useAuth()
        
        expect( authStatus.value ).toBe( 'authenticated' )
        expect( username.value ).toBe( 'Erik' )
    })
    
})