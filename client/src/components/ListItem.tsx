import React from 'react'
import { Checkbox, Avatar } from 'antd'

export default ({ checked, active, children, label }: any) => (
  <div style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
    <Checkbox
      checked={checked}
      disabled={!active}
    />
    { label }
  </div>
)