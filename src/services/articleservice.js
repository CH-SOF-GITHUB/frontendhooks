import axios from '../api/axios'
const ARTICLE_API = 'articles'

/**
 * The function fetches articles from an API using axios in JavaScript.
 * @returns The `fetcharticles` function is returning a promise that resolves to the result of the
 * `axios.get` call to the `ARTICLE_API`.
 */
export const fetcharticles = async () => {
  return await axios.get(ARTICLE_API)
}

/**
 * This function fetches an article by its ID using an API endpoint.
 * @param id - The `id` parameter in the `fetcharticlesById` function is used to specify the unique
 * identifier of the article that you want to fetch from the API. This function makes an asynchronous
 * request to the server to retrieve the article data based on the provided `id`.
 * @returns The `fetcharticlesById` function is returning a promise that resolves to the result of the
 * `axios.get` call, which is a GET request to the specified article API endpoint with the provided
 * `id`.
 */
export const fetcharticlesById = async id => {
  return await axios.get(ARTICLE_API + '/' + id)
}

/**
 * The function `deletearticle` uses axios to send a DELETE request to the specified ARTICLE_API
 * endpoint with the provided id.
 * @param id - The `id` parameter in the `deletearticle` function is the unique identifier of the
 * article that you want to delete. This identifier is used to specify which article should be deleted
 * from the server when the `deletearticle` function is called.
 * @returns The `deletearticle` function is returning a promise that resolves to the result of the
 * `axios.delete` call, which is the deletion of an article with the specified `id` from the API
 * endpoint `ARTICLE_API`.
 */
export const deletearticle = async id => {
  return await axios.delete(ARTICLE_API + '/' + id)
}

/**
 * The function `addarticle` is an asynchronous function that sends a POST request to an API endpoint
 * with the provided article data.
 * @param article - The `article` parameter in the `addarticle` function is an object that represents
 * the article data that you want to add to the server. It likely contains information such as the
 * title, content, author, publication date, etc. This object will be sent as the payload in the POST
 * request to
 * @returns The `addarticle` function is returning a promise that resolves to the result of the
 * `axios.post` call, which is the response from the POST request to the `ARTICLE_API` with the
 * `article` data.
 */
export const addarticle = async article => {
  return await axios.post(ARTICLE_API, article)
}

/**
 * The `editarticle` function updates an article using a PUT request to the specified API endpoint.
 * @returns The `editarticle` function is returning a promise that resolves to the result of the
 * `axios.put` request to update an article with the provided data.
 */
export const editarticle = async article => {
  return await axios.put(ARTICLE_API + '/' + article._id, article)
}


/**
 * The function fetches articles with pagination using the specified page and limit parameters.
 * @param page - The `page` parameter in the `fetcharticlesPagination` function represents the page
 * number of the articles you want to fetch. It is used to specify which page of articles to retrieve
 * from the API.
 * @param limit - The `limit` parameter in the `fetcharticlesPagination` function represents the number
 * of articles to be displayed per page. It determines the page size for the pagination feature,
 * limiting the number of articles shown on each page.
 * @returns The function `fetcharticlesPagination` is returning a Promise that resolves to the result
 * of the axios GET request to the specified API endpoint for fetching articles with pagination based
 * on the provided `page` and `limit` parameters.
 */
export const fetcharticlesPagination=async(page,limit,searchtext)=> { 
    return await axios.get(ARTICLE_API + `/art/pagination?filtre=${searchtext}&page=${page}&pageSize=${limit}`) 
} 