import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import AlertModal from './AlertModal'

const meta: Meta<typeof AlertModal> = {
  tags: ['autodocs'],
  title: 'Components/Modal/Alert',
  component: AlertModal,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryFn<typeof AlertModal>

export const Primary: Story = () => {
  let [open, setOpen] = useState(false)

  return (
    <div>
      <button
        className="rounded-md bg-action-primary p-3 text-on-secondary hover:bg-action-primary-active"
        onClick={() => setOpen(true)}
      >
        Show Modal
      </button>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        title="Title"
        description="Some message string."
        icon="visibility"
        variant="primary"
      />
    </div>
  )
}

export const Error: Story = () => {
  let [open, setOpen] = useState(false)

  return (
    <div>
      <button
        className="rounded-md bg-action-primary p-3 text-on-secondary hover:bg-action-primary-active"
        onClick={() => setOpen(true)}
      >
        Show Modal
      </button>
      <AlertModal
        open={open}
        onClose={() => setOpen(false)}
        title="Title"
        description="Some message string."
        icon="error"
        variant="error"
      />
    </div>
  )
}

export default meta
