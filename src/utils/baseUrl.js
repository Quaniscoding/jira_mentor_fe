import axios from "axios";
import { getStringLocal } from "./config";
import { ACCESS_TOKEN, DOMAIN_BE } from "./constant";

export const http = axios.create({
    baseURL: DOMAIN_BE,
    timeout: 5000
})
http.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${getStringLocal(ACCESS_TOKEN)}`,
            TokenCybersoft: 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyZWQiOiIyLzQvMjA0NiAzOjE2OjM4IF BNIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImI5Mzc2NDk3LTE2NzgtNDJlMC1iOGY4LWQ1Y2NhYTAzMjc0ZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2x haW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJDX0tIIiwiQU5ZIiwiQ19MTCIsIkNfTE9QIiwiQ19ORCIsIkNIRUNLX01FTlRPUl9MT1AiLCJEX 0RBTkgiLCJEX0tIIiwiRF9MTCIsIkRfTkQiLCJGX0dDIiwiRl9MT1AiLCJHRF9MSCIsIktfVFQiLCJOX1FVWUVOIiwiUUxfQkwiLCJRTF9CTSIsIlFMX0NMIiwiUUxfR0MiLCJRTF9ITVQiLCJRTF9LSCIsIlFMX0xUIiwiUUxfVFQiLCJSX0JIIiwiUl9LSCIsIlJfTEwiLCJSX0xPUCIsIlJfTkQi LCJSX1ZMIiwiVV9LSCIsIlVfTEwiLCJVX0xPUCIsIlVfTkQiLCJYX0tIX0wiLCJRTF9MQ04iLCJRTF9US0QiLCJRTF9DSFRMIiwiUUxfUk0iLCJEX0JUIiwiS19DSEVDS19MIiwiUUxfQ0NOIiwiUUxfS0tIViIsIlVfTkdBWV9CSCIsIlFMX0NPTkZJRyJdLCJuYmYiOjE2NzU0OTg1OTgsI mV4cCI6MTY3NTUwMjE5OH0.qDwGahgmxsJyfRjjpEUJk3i-fjLHKTCEOs3VKhTMVyo'
        }
    }
}, err => { console.log(err) })
