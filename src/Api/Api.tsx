import axios from "axios";

const searchImages = async(term: string | undefined) => {
    const response = await axios.get("https://api.unsplash.com/search/photos", {
        headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_CLIENT_ID}`
        },
        params: {
            query: term
        }
    })

    return response.data.results
}

export default searchImages