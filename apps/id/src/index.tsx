import React from 'react'
import ReactDOM from 'react-dom'

import { registerSprite } from '@jibrelcom/ui'

import App from './App'
import sprite from './utils/sprite'

registerSprite('id', sprite)

const MOUNT_NODE = document.getElementById('app')

ReactDOM.render(<App />, MOUNT_NODE)
