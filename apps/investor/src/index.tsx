import React from 'react'
import ReactDOM from 'react-dom'

// settings should be initialized before everything else in the app
import './app/settings'

import App from './App'

const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(<App />, MOUNT_NODE)
