import axios from "axios";

export default {

  logIn: loginData => {
    return axios.post("/users/logIn", loginData)
  },

  checkUserIsLoggedIn: token => {
    return axios.get("api/info/auth",
    {headers: {"Authorization" : `Bearer ${token}`}}
  )},

  getBalance: reqObj => {
    return axios.get("/api/info/balance/" + reqObj.id,
    {headers: {"Authorization" : `Bearer ${reqObj.token}`}}
  )},

  getInventory: token => {
    return axios.get("/api/info/inventory/",
    {headers: {"Authorization" : `Bearer ${token}`}}
  )},

  showItemQty: reqObj => {
    return axios.get("/api/info/inventory/" + reqObj.colour,
    {headers: {"Authorization" : `Bearer ${reqObj.token}`}}
  )},

  insertOrder: orderDetails => {
    return axios.put("/api/order/create", orderDetails,
    {headers: {"Authorization" : `Bearer ${orderDetails.token}`}}
  )},

};

