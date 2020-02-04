import axios from 'axios';
import env from "../../config/env_property"

axios.defaults.baseURL = env.DOMAIN + env.CONTEXT_PATH

export default axios;