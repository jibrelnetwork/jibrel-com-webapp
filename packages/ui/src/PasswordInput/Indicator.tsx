import React, { Component } from 'react'
import cc from 'classcat'

import style from './style.scss'
import getStatusByScore from './getStatusByScore'

import {
  IndicatorStatus,
  PasswordStrengthScore,
  CheckPasswordStrengthHandler,
} from './types'

export interface IndicatorProps {
  onScoreChange: (score: number) => void;
  checkPasswordStrength: CheckPasswordStrengthHandler;
  userInputs?: string[];
  value: string;
}

type IndicatorScore = PasswordStrengthScore | -1

interface IndicatorState {
  score: IndicatorScore;
  isFetching: boolean;
  isInitialised: boolean;
}

class Indicator extends Component <IndicatorProps, IndicatorState> {
  constructor(props: IndicatorProps) {
    super(props)

    this.state = {
      score: -1,
      isFetching: false,
      isInitialised: false,
    }

    const { value } = props

    if (value) {
      this.checkPassword(value)
    }
  }

  componentDidUpdate(prevProps: IndicatorProps): void {
    const { value } = this.props

    if (prevProps.value === value) {
      return
    }

    if (value) {
      this.checkPassword(value)
    } else {
      this.setScore(-1)
    }
  }

  setScore = (score: IndicatorScore): void => {
    this.setState({ score })
    this.props.onScoreChange(score)
  }

  checkPassword = async (password: string): Promise<void> => {
    const {
      checkPasswordStrength,
      userInputs,
    } = this.props

    const { isInitialised }: IndicatorState = this.state

    if (!isInitialised) {
      this.setState({ isFetching: true })
    }

    const score = await checkPasswordStrength(password, userInputs)
    this.setScore(score)

    if (!isInitialised) {
      this.setState({
        isFetching: false,
        isInitialised: true,
      })
    }
  }

  render(): React.ReactNode {
    const {
      score,
      isFetching,
    } = this.state

    const status = isFetching ? IndicatorStatus.fetching : getStatusByScore(score)

    if (!status) {
      return null
    }

    return (
      <div className={style.indicator}>
        <div
          className={cc([
            style.bar,
            style[status],
          ])}
        />
      </div>
    )
  }
}

export default React.memo(Indicator)
