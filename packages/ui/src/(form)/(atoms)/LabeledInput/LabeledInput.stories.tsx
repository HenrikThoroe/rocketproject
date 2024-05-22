import type { Meta, StoryObj } from '@storybook/react'
import TextInput from '../TextInput/TextInput'
import LabeledInput from './LabeledInput'

const meta: Meta<typeof LabeledInput> = {
  tags: ['autodocs'],
  title: 'Components/Form/Atoms/Labeled Input',
  component: LabeledInput,
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

type Story = StoryObj<typeof LabeledInput>

export const Plain: Story = {
  args: {
    label: 'Label',
    required: false,
    children: <TextInput type="text" />,
  },
}

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    children: <TextInput type="text" />,
  },
}

export const WithErrorMessage: Story = {
  args: {
    label: 'With Error Message',
    required: false,
    error: 'You should have eaten your vegetables!',
    children: <TextInput type="text" />,
  },
}

export default meta
