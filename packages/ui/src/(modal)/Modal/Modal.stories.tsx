import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import Modal from './Modal'

const meta: Meta<typeof Modal> = {
  tags: ['autodocs'],
  title: 'Components/Modal/Modal',
  component: Modal,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryFn<typeof Modal>

export const Plain: Story = () => {
  let [open, setOpen] = useState(false)

  return (
    <div>
      <button
        className="rounded-md bg-action-primary p-3 text-on-secondary hover:bg-action-primary-active"
        onClick={() => setOpen(true)}
      >
        Show Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        Modal content
      </Modal>
    </div>
  )
}

export default meta
