import axios, {type AxiosInstance} from "axios"

export class Http {
    instance: AxiosInstance
    constructor() {
        this.instance = axios.create({
            baseURL: "https://" + import.meta.env.VITE_API_URL,
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "undefine"
            }
        })


        this.instance.interceptors.request.use(async (req) => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("access_token");
                if (token) {
                    req.headers.Authorization = `Bearer ${token}`;
                }
            }
            return req;
        }, error => {
            return Promise.reject(error);
        })
        this.instance.interceptors.response.use((res) => {
            return res
        }, (_error: any) => {

        })

    }

}
export default new Http().instance