import type { Meta, StoryObj } from '@storybook/react'
import SelectInput from './SelectInput'

const meta: Meta<typeof SelectInput> = {
  tags: ['autodocs'],
  title: 'Components/Form/Atoms/Select Input',
  component: SelectInput,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '20rem' }}>
          <Story />
        </div>
      </div>
    ),
  ],
}

type Story = StoryObj<typeof SelectInput>

export const Plain: Story = {
  args: {
    defaultValue: 'mango',
    options: [
      { value: 'banana', label: 'Banana' },
      { value: 'apple', label: 'Apple' },
      { value: 'orange', label: 'Orange' },
      { value: 'mango', label: 'Mango' },
    ],
  },
}

export default meta
