/**
 * this will allow us to use the same services (eg. apiClient) accross
 * different components and utilities by eg. setting
 *
 * services.set('api', new ApiClient(...))
 *
 * and retreiving it again
 *
 * const apiClient = services.get('api')
 */
export const services = new Map()
