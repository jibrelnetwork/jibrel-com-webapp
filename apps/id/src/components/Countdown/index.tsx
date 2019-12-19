import React, { Component } from 'react'

import style from './style.scss'

interface CountdownProps {
  onFinish?: () => Promise<void> | void;
  timeLeft: number;
}

interface CountdownState {
  countdown: number;
}

const ONE_MINUTE = 60
const ONE_SECOND = 1000

class Countdown extends Component<CountdownProps, CountdownState> {
  constructor(props: CountdownProps) {
    super(props)

    this.state = {
      countdown: props.timeLeft,
    }
  }

  componentDidMount(): void {
    this.tick()
  }

  componentWillUnmount(): void {
    clearTimeout(this.timeout)
  }

  componentDidUpdate(prevProps: CountdownProps): void {
    if (this.props.timeLeft !== prevProps.timeLeft) {
      clearTimeout(this.timeout)
      this.setState({
        countdown: this.props.timeLeft,
      })
      this.tick()
    }
  }

  tick = (): void => {
    const countdown = this.state.countdown - 1

    if (countdown < 0) {
      this.setState({ countdown: 0 })

      const { onFinish } = this.props

      if (onFinish) {
        onFinish()
      }

      return
    }

    this.timeout = setTimeout(() => {
      this.setState({ countdown })
      this.tick()
    }, ONE_SECOND)
  }

  render(): React.ReactNode {
    const { countdown } = this.state

    if (!countdown) {
      return null
    }

    const min = Math.floor(countdown / ONE_MINUTE)
    const sec = countdown - (min * ONE_MINUTE)

    return (
      <div className={style.countdown}>
        {!!min && (
          <>
            <span className={style.number}>{min}</span> min
          </>
        )}
        {!!sec && (
          <>
            <span className={style.number}>{sec}</span> sec
          </>
        )}
      </div>
    )
  }
}

export default Countdown
