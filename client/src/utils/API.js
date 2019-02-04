import axios from "axios";

export default {

  logIn: function(loginData) {
    return axios.post("/users/logIn", loginData)
  }

};

