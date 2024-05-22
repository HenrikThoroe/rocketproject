import '@fontsource/inter'
import type { Meta, StoryFn } from '@storybook/react'
import classNames from 'classnames'
import Icon from './Icon'

const meta: Meta<typeof Icon> = {
  tags: ['autodocs'],
  title: 'Components/Media/Icon',
  component: Icon,
  decorators: [
    (Story) => (
      <div
        style={{
          width: '100%',
          display: 'flex',
          padding: '2rem',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Inter',
        }}
      >
        <Story />
      </div>
    ),
  ],
}

type Story = StoryFn<typeof Icon>

export const Plain: Story = () => {
  const Box = ({ children, name }: { children: React.ReactNode; name: string }) => (
    <div className="flex w-[5rem] flex-col items-center gap-2">
      <div className="shadow-card flex flex-row items-center justify-center gap-x-4 rounded-md bg-white p-4">
        {children}
      </div>
      <span className="text-on-primary-light text-sm font-medium">{name}</span>
    </div>
  )

  return (
    <div className={classNames('flex flex-row flex-wrap gap-8')}>
      <Box name="add">
        <Icon name="add" />
      </Box>
      <Box name="assignment">
        <Icon name="assignment" />
      </Box>
      <Box name="attach">
        <Icon name="attach" />
      </Box>
      <Box name="copy">
        <Icon name="copy" />
      </Box>
      <Box name="delete">
        <Icon name="delete" />
      </Box>
      <Box name="desktop">
        <Icon name="desktop" />
      </Box>
      <Box name="download">
        <Icon name="download" />
      </Box>
      <Box name="edit">
        <Icon name="edit" />
      </Box>
      <Box name="error">
        <Icon name="error" />
      </Box>
      <Box name="filter">
        <Icon name="filter" />
      </Box>
      <Box name="login">
        <Icon name="login" />
      </Box>
      <Box name="memory">
        <Icon name="memory" />
      </Box>
      <Box name="next">
        <Icon name="next" />
      </Box>
      <Box name="play">
        <Icon name="play" />
      </Box>
      <Box name="prev">
        <Icon name="prev" />
      </Box>
      <Box name="query-stats">
        <Icon name="query-stats" />
      </Box>
      <Box name="remove">
        <Icon name="remove" />
      </Box>
      <Box name="replay">
        <Icon name="replay" />
      </Box>
      <Box name="stats">
        <Icon name="stats" />
      </Box>
      <Box name="storage">
        <Icon name="storage" />
      </Box>
      <Box name="upload">
        <Icon name="upload" />
      </Box>
      <Box name="visibility">
        <Icon name="visibility" />
      </Box>
      <Box name="person">
        <Icon name="person" />
      </Box>
      <Box name="logout">
        <Icon name="logout" />
      </Box>
      <Box name="email-read">
        <Icon name="email-read" />
      </Box>
      <Box name="game">
        <Icon name="game" />
      </Box>
    </div>
  )
}

export default meta
