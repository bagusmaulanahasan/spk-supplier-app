import axios from "axios";

// const API = axios.create({ baseURL: 'http://localhost:3000/api' });
// api/api.js

const API = axios.create({
    baseURL: "http://localhost:3000/api",
});

// const API = axios.create({
//     baseURL: "http://192.168.1.59:3000/api",
// });

// Fungsi untuk ambil token dari localStorage dan pasang di header Authorization
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = (data) => API.post("/login", data);
export const register = (data) => API.post("/register", data);

export const getUsers = () => API.get("/users");
export const createUser = (data) => API.post("/users", data);
export const updateUser = (id, data) => API.put(`/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/users/${id}`);

export const getMaterialTypes = () => API.get("/material-supply");
export const createMaterialTypes = (data) => API.post("/material-supply", data);
export const updateMaterialTypes = (id, data) => API.put(`/material-supply/${id}`, data);
export const deleteMaterialTypes = (id) => API.delete(`/material-supply/${id}`);

export const getCriteria = () => API.get("/criteria");
export const getCriteriaById = (id) => API.get(`/criteria/${id}`);
export const createCriteria = (data) => API.post("/criteria", data);
export const updateCriteria = (id, data) => API.put(`/criteria/${id}`, data);
export const deleteCriteria = (id) => API.delete(`/criteria/${id}`);

export const getSuppliers = () => API.get("/suppliers");
export const createSupplier = (data) => API.post("/suppliers", data);
export const updateSupplier = (id, data) => API.put(`/suppliers/${id}`, data);
export const deleteSupplier = (id) => API.delete(`/suppliers/${id}`);

export const getCriteriaValues = () => API.get("/criteria-values");
export const createCriteriaValue = (data) => API.post("/criteria-values", data);
export const updateCriteriaValue = (id, data) =>
    API.put(`/criteria-values/${id}`, data);
export const deleteCriteriaValue = (id) => API.delete(`/criteria-values/${id}`);

export const getResults = () => API.get("/results");
export const getResultByDate = () => API.get("/results/dates")
export const createResult = (data) => API.post("/results", data);
export const updateResult = (id, data) => API.put(`/results/${id}`, data);
export const deleteResult = (id) => API.delete(`/results/${id}`);

export const getSupplierCriteriaValues = () =>
    API.get("/supplier-criteria-values");
export const createSupplierCriteriaValue = (data) =>
    API.post("/supplier-criteria-values", data);
export const updateSupplierCriteriaValue = (id, data) =>
    API.put(`/supplier-criteria-values/${id}`, data);
export const deleteSupplierCriteriaValue = (id) =>
    API.delete(`/supplier-criteria-values/${id}`);

// export const getWeights = () => API.get('/weights');
// export const createWeight = (data) => API.post('/weights', data);
// export const updateWeight = (id, data) => API.put(`/weights/${id}`, data);
// export const deleteWeight = (id) => API.delete(`/weights/${id}`);
