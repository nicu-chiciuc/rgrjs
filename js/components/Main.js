import React from 'react'
import API from '../API'
import LinkStore from '../stores/LinkStore'

const _getAppState = () => {
  return {
    links: LinkStore.getAll(),
  }
}

class Main extends React.Component {
  state = _getAppState()

  static defaultProps = {
    limit: 4,
  }

  onChange = () => {
    console.log('4. in onChange()')
    this.setState(_getAppState())
  }

  componentDidMount() {
    API.fetchLinks()
    LinkStore.on('change', this.onChange)
  }

  render() {
    const content = this.state.links.map(link => {
      return (
        <li key={link._id}>
          <a href={link.url}>{link.title}</a>
        </li>
      )
    })

    return (
      <div>
        <h3>Links</h3>
        <ul>{content}</ul>
      </div>
    )
  }
}

export default Main
