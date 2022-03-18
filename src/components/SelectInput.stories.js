import React from 'react'
import { storiesOf } from '@storybook/react'
import { SelectInput } from './SelectInput'

storiesOf('SelectInput', module)
  .add('SelectInput (default)', () => (
    <SelectInput id="name" label="Name" data={[
      { id: 1, name: 'Sepp' },
      { id: 2, name: 'Mike' },
      { id: 3, name: 'Fabian' },
      { id: 4, name: 'Baum' }
    ]}></SelectInput>
  ))
