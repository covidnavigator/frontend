import React, { useState } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import './graphSlider.scss'

export function GraphSlider({
  value,
  setValue,
  className,
  defaultMarks,
  activeMarks,
}) {
  const [isActive, setActive] = useState(false)

  return (
    <div className={className}>
      <Slider
        className="slider"
        vertical={true}
        marks={isActive ? activeMarks : defaultMarks}
        min={0}
        max={Object.keys(defaultMarks).length - 1}
        included={false}
        value={value}
        onAfterChange={() => setActive(false)}
        onBeforeChange={() => setActive(true)}
        onChange={(value) => setValue(value)}
      />
    </div>
  )
}
