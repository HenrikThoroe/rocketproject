import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import ActionModal from './ActionModal'

const meta: Meta<typeof ActionModal> = {
  tags: ['autodocs'],
  title: 'Components/Modal/Action',
  component: ActionModal,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryFn<typeof ActionModal>

export const Primary: Story = () => {
  let [open, setOpen] = useState(false)

  return (
    <div>
      <button
        className="bg-action-primary text-on-secondary hover:bg-action-primary-active rounded-md p-3"
        onClick={() => setOpen(true)}
      >
        Show Modal
      </button>
      <ActionModal
        open={open}
        onClose={() => setOpen(false)}
        title="Title"
        description="Some message string."
        icon="visibility"
        action={{
          label: 'Action',
          onClick: () => setOpen(false),
          variant: 'primary',
        }}
      />
    </div>
  )
}

export const Danger: Story = () => {
  let [open, setOpen] = useState(false)

  return (
    <div>
      <button
        className="bg-action-primary text-on-secondary hover:bg-action-primary-active rounded-md p-3"
        onClick={() => setOpen(true)}
      >
        Show Modal
      </button>
      <ActionModal
        open={open}
        onClose={() => setOpen(false)}
        title="Title"
        description="Some message string."
        icon="visibility"
        action={{
          label: 'Action',
          onClick: () => setOpen(false),
          variant: 'danger',
        }}
      />
    </div>
  )
}

export default meta
