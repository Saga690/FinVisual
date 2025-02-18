import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions"; 

export const getTransactions = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addTransaction = async (transaction) => {
  await axios.post(API_URL, transaction);
};

export const editTransaction = async (id, transaction) => {
  await axios.put(`${API_URL}/${id}`, transaction);
};

export const deleteTransaction = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
