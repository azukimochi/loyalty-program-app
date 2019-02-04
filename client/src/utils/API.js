import axios from "axios";

export default {

  logIn: function(loginData) {
    return axios.post("/users/logIn", loginData)
  },

  getBalance: function(reqObj) {
    return axios.get("/api/info/balance/" + reqObj.id,
    {headers: {"Authorization" : `Bearer ${reqObj.token}`}}
  )}

};

