import type { Meta, StoryObj } from '@storybook/react'
import FileInput from '../FileInput/FileInput'
import FormSeparator from '../FormSeparator/FormSeparator'
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton'
import LabeledInput from '../LabeledInput/LabeledInput'
import ListInput from '../ListInput/ListInput'
import SelectInput from '../SelectInput/SelectInput'
import TextInput from '../TextInput/TextInput'
import Form from './Form'

const meta: Meta<typeof Form> = {
  tags: ['autodocs'],
  title: 'Components/Form/Atoms/Form',
  component: Form,
  decorators: [
    (Story) => (
      <div style={{ width: '100%', display: 'flex', padding: '2rem', flexDirection: 'column' }}>
        <Story />
      </div>
    ),
  ],
}

type Story = StoryObj<typeof Form>

export const Plain: Story = {
  args: {
    onSubmit: (e) => e.preventDefault(),
    children: (
      <>
        <LabeledInput label="Username" required>
          <TextInput type="text" required />
        </LabeledInput>
        <LabeledInput label="Password" error="Passwords are boring anyway." required>
          <TextInput type="password" required />
        </LabeledInput>
        <FormSeparator label="The Real Deal" />
        <LabeledInput label="Favourite Fruit">
          <SelectInput
            options={[
              { value: 'banana', label: 'Banana' },
              { value: 'apple', label: 'Apple' },
              { value: 'orange', label: 'Orange' },
              { value: 'mango', label: 'Mango' },
            ]}
          />
        </LabeledInput>
        <ListInput
          label="Least Favourite Fruit"
          onAdd={() => {}}
          onRemove={() => {}}
          format={(item) => <span>{item}</span>}
          items={['Apple', 'Orange', 'Banana', 'Mango']}
        />
        <LabeledInput label="Fruit Picture" required>
          <FileInput required />
        </LabeledInput>
        <FormSubmitButton>Submit</FormSubmitButton>
      </>
    ),
  },
}

export default meta
