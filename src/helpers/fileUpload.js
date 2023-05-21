

export const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dlmg86obx/upload' //direccion url de cloudinary donde se va a subir la foto

    //hay q crear el form data para enviarlo a cloudinary
    const formData = new FormData()
    formData.append('upload_preset','react-journal')
    formData.append('file',file)

    try {
        const resp = await fetch(cloudUrl,{
            method:'POST',
            body:formData
        })

        if(resp.ok){
            const cloudResp = await resp.json()//si la respuesta esta bien q la convierta en json y entonces se puede sacar la url segura q es donde se va a cargar la img
            return cloudResp.secure_url
        }else{
            throw await resp.json() //se lanza un error de la respuesta .json
        }

    } catch (err) {
        console.log(err)
        throw err
    }
}
