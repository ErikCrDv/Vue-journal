import axios from 'axios'
import createVuexStore from '../../../mock-data/mock-store'

describe('Vuex: Pruebas en el auth Module', () => {

    test('estado inicial', () => {
        const store = createVuexStore({
            status: 'authenticating',
            user: null,
            idToken: null,
            refreshToken: null
        })

        const { status, user, idToken, refreshToken } = store.state.auth
        expect( status ).toBe( 'authenticating' )
        expect( user ).toBe( null )
        expect( idToken ).toBe( null )
        expect( refreshToken ).toBe( null )
    })

    // Mutation
    test('Mutation: loginUser', () => {
        const store = createVuexStore({
            status: 'authenticating',
            user: null,
            idToken: null,
            refreshToken: null
        })
        
        const payload = {
            user: { name: 'Erik', email: 'erik@test.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        }

        store.commit('auth/loginUser', payload )

        const { status, user, idToken, refreshToken } = store.state.auth
        expect( status ).toBe( 'authenticated' )
        expect( user ).toEqual( { name: 'Erik', email: 'erik@test.com' } )
        expect( idToken ).toBe( 'ABC-123' )
        expect( refreshToken ).toBe( 'XYZ-123' )
    })

    test('Mutation: logout', () => {
        const store = createVuexStore({
            status: 'authenticated',
            user: { name: 'Erik', email: 'erik@test.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        })

        localStorage.setItem('idToken', 'ABC-123')
        localStorage.setItem('refreshToken', 'XYZ-123')

        store.commit('auth/logout')

        const { status, user, idToken, refreshToken } = store.state.auth
        expect( status ).toBe( 'not-authenticated' )
        expect( user ).toBe( null )
        expect( idToken ).toBe( null )
        expect( refreshToken ).toBe( null )

        expect( localStorage.getItem('idToken') ).toBeFalsy()
        expect( localStorage.getItem('refreshToken') ).toBeFalsy()
    })

    // Getters
    test('Getters: username currentState', () => {
        const store = createVuexStore({
            status: 'authenticated',
            user: { name: 'Erik', email: 'erik@test.com' },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        })

        expect( store.getters['auth/currentState'] ).toBe( 'authenticated' )
        expect( store.getters['auth/username'] ).toBe( 'Erik' )
    })

    // Actions
    test('Actions: el usuario ya existe', async () => {
        const store = createVuexStore({
            status: 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = {name: 'Test', email: 'test@test.com', password: '123456'}
        const resp = await store.dispatch('auth/createUser', newUser)
        expect( resp ).toEqual({ ok: false, message: 'EMAIL_EXISTS' })

        const { status, user, idToken, refreshToken } = store.state.auth
        expect( status ).toBe( 'not-authenticated' )
        expect( user ).toBe( null )
        expect( idToken ).toBe( null )
        expect( refreshToken ).toBe( null )
    })

    test('Actions: createUser signUser - crea el usuaruo', async () => {
        const store = createVuexStore({
            status: 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })

        // SingIn
        await store.dispatch('auth/signInUser', {email: 'Erik@Cordova.com', password: 'abc123'})
        const { idToken } = store.state.auth
        // Borrar el usuario
        await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyA1V8VnUhGvKIZmCcI3tM5bdu-HX6EH9oU', {
            idToken
        })
        //Crear el usuario
        const newUser = {name: 'Erik', email: 'Erik@Cordova.com', password: 'abc123'}
        const resp = await store.dispatch('auth/createUser', newUser)
        
        expect( resp ).toEqual( {ok: true} )

        const { status, user, idToken:token, refreshToken } = store.state.auth
        expect( status ).toBe( 'authenticated' )
        expect( user ).toMatchObject({name: 'Erik', email: 'Erik@Cordova.com'})
        expect( typeof token ).toBe( 'string' )
        expect( typeof refreshToken ).toBe( 'string' )
        
    })

    test('Actions: checkAuthenticacion - POSITIVA', async () => {
        const store = createVuexStore({
            status: 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })

        // SignIn
        await store.dispatch('auth/signInUser', {email: 'test@test.com', password: '123456'})
        const { idToken, refreshToken } = store.state.auth

        store.commit('auth/logout')

        localStorage.setItem('idToken', idToken)
        localStorage.setItem('refreshToken', refreshToken)

        const checkResp = await store.dispatch('auth/checkAuthentication')
        expect( checkResp ).toEqual({ ok: true })

        const { status, user, idToken:token, refreshToken:rToken } = store.state.auth
        expect( status ).toBe( 'authenticated' )
        expect( user ).toMatchObject({ name: 'User Test', email: 'test@test.com' })
        expect( typeof token ).toBe( 'string' )
        expect( typeof rToken ).toBe( 'string' )
    })

    test('Actions: checkAuthenticacion - POSITIVA', async () => {
        const store = createVuexStore({
            status: 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })
        
        localStorage.removeItem('idToken')
        localStorage.removeItem('refreshToken')

        const resp = await store.dispatch('auth/checkAuthentication')
        expect( resp ).toEqual( { ok: false, message: 'No hay token' } )
        expect( store.state.auth.status ).toBe('not-authenticated')
        expect( store.state.auth.user ).toBeFalsy()
        expect( store.state.auth.idToken ).toBeFalsy()
        
        localStorage.setItem('idToken', 'ABC-123')
        const resp2 = await store.dispatch('auth/checkAuthentication')
        expect(resp2).toEqual( { ok: false, message: 'INVALID_ID_TOKEN' } )
        expect( store.state.auth.status ).toBe('not-authenticated')
    })
})