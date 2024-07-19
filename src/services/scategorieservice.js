import axios from "../api/axios"

const SCATEGORIE_API = "scategories"

export const fetchscategories = async() => {
    return await axios.get(SCATEGORIE_API);
}