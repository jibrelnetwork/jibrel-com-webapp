import React, { Component } from 'react'
import { useI18n } from '@jibrelcom/i18n'

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

enum Fraction {
  min = 'min',
  sec = 'sec',
}

const TimeFraction: React.FunctionComponent<{
  value: number;
  fraction: Fraction;
}> = ({
  value,
  fraction,
}) => {
  const i18n = useI18n()

  return (
    <div className={`${style.fraction} ${style[fraction]}`}>
      <span className={style.value}>
        {value}
      </span>
      <span className={style.label}>
        {i18n._(`common.components.Countdown.${Fraction[fraction]}`)}
      </span>
    </div>
  )
}

class Countdown extends Component<CountdownProps, CountdownState> {
  timeout: number

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

    this.timeout = window.setTimeout(() => {
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
      <div className={style.main}>
        {!!min && <TimeFraction value={min} fraction={Fraction.min} />}
        {!!sec && <TimeFraction value={sec} fraction={Fraction.sec} />}
      </div>
    )
  }
}

export default Countdown
