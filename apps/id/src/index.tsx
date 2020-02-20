import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom'

// settings should be initialized before everything else in the app
import './app/settings'
import { registerSprite } from '@jibrelcom/ui'

import App from './App'
import sprite from './utils/sprite'

registerSprite('id', sprite)

const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(<App />, MOUNT_NODE)
