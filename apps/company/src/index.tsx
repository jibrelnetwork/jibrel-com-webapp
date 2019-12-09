import React from 'react'
import ReactDOM from 'react-dom'

const MOUNT_NODE = document.getElementById('app')

const App: React.FunctionComponent = () => (
  <code>company application</code>
)

ReactDOM.render(<App />, MOUNT_NODE)
