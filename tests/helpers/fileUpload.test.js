import { fileUpload } from "../../src/helpers/fileUpload"
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name:'dmontero7',
    api_key:'268994353598748',
    api_secret:'75i1QOG-PVcu3RaHR6h8rX_whUA',
    secure:true
})

describe('Pruebas en fileupload', () => { 
    test('should subir el archivo correctamente a cloudinary', async() => { 
        const imageUrl= 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FzYSUyMG1vZGVybmF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60'
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob],'casa.jpg')
        const url = await fileUpload(file);
        expect (typeof url).toBe('string');
        const segments = url.split('/');
        const imageId = segments[segments.length -1].replace('.jpg','');
        await cloudinary.api.delete_resources(['journal/'+imageId]);
     })

 })