import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import LoadingModal from './LoadingModal'

const meta: Meta<typeof LoadingModal> = {
  tags: ['autodocs'],
  title: 'Components/Modal/Loading',
  component: LoadingModal,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryFn<typeof LoadingModal>

export const Plain: Story = () => {
  let [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 5000)
  }

  return (
    <div>
      <button
        className="rounded-md bg-action-primary p-3 text-on-secondary hover:bg-action-primary-active"
        onClick={handleOpen}
      >
        Show Modal
      </button>
      <LoadingModal open={open} />
    </div>
  )
}

export default meta
