import React, { useState, useEffect } from 'react'
import { noop } from 'lodash-es'
import Lottie from 'react-lottie'

interface AnimationProps {
  className: string;
  loadAnimation: () => Promise<Record<string, unknown>>;
  isHovered: boolean;
  loop: number | boolean;
  loopCount: number;
}

const Animation: React.FunctionComponent<AnimationProps> = ({
  loadAnimation = noop,
  loop= false,
  className,
}) => {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    Promise.resolve()
      .then(loadAnimation)
      .then(setAnimationData)
      .catch(() => {
        setAnimationData(null)
      })
  }, [loadAnimation])

  return (
    <div className={className}>
      <Lottie
        options={{
          loop: loop,
          animationData,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
          }
        }}
        speed={1}
        direction={1}
      />
    </div>
  )
}

export default React.memo(Animation)
