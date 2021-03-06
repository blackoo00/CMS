import { message } from 'antd'

export default {
    checkPicType:(file) => {
        console.log(222);
        const isJPG = file.type === 'image/jpeg'
        if (!isJPG) {
            message.error('You can only upload JPG file!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!')
        }
        return isJPG && isLt2M
    },
    getBase64:(img, callback) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => callback(reader.result))
        reader.readAsDataURL(img)
    }
}
