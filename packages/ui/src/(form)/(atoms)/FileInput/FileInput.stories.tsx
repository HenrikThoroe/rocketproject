import type { Meta, StoryObj } from '@storybook/react'
import FileInput from './FileInput'

const meta: Meta<typeof FileInput> = {
  tags: ['autodocs'],
  title: 'Components/Form/Atoms/File Input',
  component: FileInput,
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

type Story = StoryObj<typeof FileInput>

export const Plain: Story = {
  args: {},
}

export const Required: Story = {
  args: {
    id: 'file-input-required',
    required: true,
  },
}

export default meta
