import type { Meta, StoryObj } from '@storybook/react'
import FormSeparator from './FormSeparator'

const meta: Meta<typeof FormSeparator> = {
  tags: ['autodocs'],
  title: 'Components/Form/Atoms/Separator',
  component: FormSeparator,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof FormSeparator>

export const Plain: Story = {
  args: {
    label: 'Next Section',
  },
}

export default meta
