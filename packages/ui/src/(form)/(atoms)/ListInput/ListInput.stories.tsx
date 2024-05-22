import type { Meta, StoryObj } from '@storybook/react'
import ListInput from './ListInput'

const meta: Meta<typeof ListInput> = {
  tags: ['autodocs'],
  title: 'Components/Form/Atoms/List Input',
  component: ListInput,
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

type Story = StoryObj<typeof ListInput>

export const Plain: Story = {
  args: {
    label: 'Fruits',
    items: ['Banana', 'Apple', 'Orange', 'Mango'],
    onAdd: () => {},
    onRemove: () => {},
    format: (item: any) => <span>{item}</span>,
  },
}

export default meta
