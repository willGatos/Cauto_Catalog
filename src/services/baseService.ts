import axios from "axios";
import {Buffer} from 'buffer';

const encodedToken = Buffer.from("ck_b37e5d2c2b254b85266e22e0bb9a8efad58b056a:cs_5862a99fa95081b4f3a45a6084ef498258995db7").toString('base64');
  var config = {
    baseURL: "https://colegios.innet.es/wp-json/wc/v3/",
    headers: { 'Authorization': 'Basic '+ encodedToken },
  };
const baseService = axios.create(config);

export default baseService;