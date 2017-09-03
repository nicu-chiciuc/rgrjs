import { post } from 'jquery'
import ServerActions from './actions/ServerActions'

let API = {
  fetchLinks() {
    post('/graphql', {
      query: `{
        links {
          title,
          _id,
          url
        }
      }`,
    }).done(resp => {
      console.log('in api')
      ServerActions.receiveLinks(resp.data.links)
    })
  },
}

export default API
