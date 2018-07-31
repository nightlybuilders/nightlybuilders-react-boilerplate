import axios from 'axios'

// this is an example for the boilerplate, you have to replace it with your actual
// api endpoint or api client
// TODO: more sophisticated api client (eg. more methods, params, options, ...)
export const apiClient = async resourceType => {
  const result = await axios.get(`https://jsonplaceholder.typicode.com/${resourceType}`)
  return { [resourceType]: result.data }
}
