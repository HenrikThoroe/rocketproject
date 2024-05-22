import type { Meta, StoryObj } from '@storybook/react'
import TextInput from './TextInput'

const meta: Meta<typeof TextInput> = {
  tags: ['autodocs'],
  title: 'Components/Form/Atoms/Text Input',
  component: TextInput,
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

type Story = StoryObj<typeof TextInput>

export const Plain: Story = {
  args: {
    type: 'text',
  },
}

export const Placeholder: Story = {
  args: {
    type: 'text',
    placeholder: 'Placeholder',
  },
}

export const Required: Story = {
  args: {
    type: 'text',
    required: true,
    placeholder: 'Required Field',
  },
}

export const Date: Story = {
  args: {
    type: 'date',
    clear: true,
  },
}

export const WithClearButton: Story = {
  args: {
    clear: true,
    type: 'text',
  },
}

export const ReadOnly: Story = {
  args: {
    readonly: true,
    type: 'text',
    defaultValue: 'Read only',
  },
}

export default meta
