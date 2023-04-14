import axios from "axios";

// baseURL é uma propriedade do próprio axios, é a parte da requisião que sempre se repete
export const api = axios.create({
  baseURL: 'http://localhost:3000'
})