import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import ActionModal from '../ActionModal/ActionModal'
import WithModal from './WithModal'

const meta: Meta<typeof WithModal> = {
  tags: ['autodocs'],
  title: 'Components/Modal/With Modal',
  component: WithModal,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryFn<typeof WithModal>

export const Plain: Story = () => {
  const [counter, setCounter] = useState(0)

  return (
    <div>
      <WithModal
        modal={
          <ActionModal
            title="Title"
            description="Some message string."
            icon="visibility"
            action={{
              label: 'Action',
              onClick: () => setCounter(counter + 1),
              variant: 'primary',
            }}
          />
        }
      >
        <button className="rounded-md bg-action-primary p-3 text-on-secondary hover:bg-action-primary-active">
          Show Modal ({counter})
        </button>
      </WithModal>
    </div>
  )
}

export default meta
