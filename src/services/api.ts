import axios from "axios";

const api = axios.create({
  baseURL: 'https://pizzaria-backend-jet.vercel.app/' //online
  // baseURL: 'http://192.168.18.142:3333' //notebook
  // baseURL: 'http://192.168.18.78:3333' //pc
})

export { api }