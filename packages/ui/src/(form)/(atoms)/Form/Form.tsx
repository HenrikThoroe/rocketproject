interface Props {
  children: React.ReactNode
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

/**
 * A styled form component that handles submit events.
 *
 * The form does not manage any state. Most form inputs provide
 * `onChange` methods or similar that can be used to update the
 * state of the parent component.
 */
export default function Form(props: Props) {
  return (
    <form
      className="flex w-[30rem] flex-col items-center justify-center gap-8 py-8"
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  )
}
