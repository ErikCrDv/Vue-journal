import axios from 'axios'
import cloudinary from 'cloudinary'
import uploadImage from '@/modules/daybook/helpers/uploadImage'

cloudinary.config({
     cloud_name: 'erikcrdv',
     api_key: '781359197512547',
     api_secret: 'cX8uFTkU3TFN-Ro5AjCyVCnLIPI'
})

describe('Pruebas en uploadImage', () => {
    test('debe de cargar un archivo y retornar el url', async ( done ) => {

        const { data } = await axios.get('https://res.cloudinary.com/erikcrdv/image/upload/v1641245737/sample.jpg', {
            responseType: 'arraybuffer'
        })

        const file = new File( [data], 'img.jpg')
        const url =  await uploadImage( file )

        expect( typeof url ).toBe('string')

        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')

        cloudinary.v2.api.delete_resources( imageId, {}, ()=> {
            done()
        })

    })
})