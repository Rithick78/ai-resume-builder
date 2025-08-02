 
 
import axios from "axios";


const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
    baseURL:import.meta.env.VITE_BASE_URL+'/api/',
    headers:{
        "Content-Type":'application/json',
        "authorization":`Bearer ${API_KEY} `
    }
})

const CreateNewResume=(data)=>axiosClient.post('/ai-resumes',data)

const GetUserResumes=(userEmail)=>axiosClient.get('/ai-resumes?filters[userEmail][$eq]='+userEmail);

const UpdateResumeDetail=(id,data)=>axiosClient.put('/ai-resumes/'+id,data)

const GetResumeId =(id)=>axiosClient.get('/ai-resumes/'+id+"?populate=*")

const DeleteResumeId =(id)=>axiosClient.delete('/ai-resumes/'+id)

export default{
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeId,
    DeleteResumeId,
}
