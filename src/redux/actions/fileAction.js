import { API_URL } from '../consts'
import AxiosInterceptors from '../../scripts/AxiosInterceptor'
const axios = require('axios').default
AxiosInterceptors()

export const downloadFile = async () => {
  const fileBlob = await axios
    .get(`${API_URL}info/feedback`, {
      responseType: 'blob',
    })
    .then((data) => data.data)

  const downloadUrl = window.URL.createObjectURL(fileBlob)

  const link = document.createElement('a')
  link.href = downloadUrl
  link.download = 'COVID_Navigator_Test_Scipt_Survey_050621.pdf'

  document.body.appendChild(link)
  link.click()
  link.remove()
}
