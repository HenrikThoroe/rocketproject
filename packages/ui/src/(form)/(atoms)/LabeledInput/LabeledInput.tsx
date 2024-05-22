interface Props {
  /**
   * The label to display above the input.
   */
  label: string

  /**
   * Whether the input is required.
   */
  required?: boolean

  /**
   * The error message to display below the input.
   * Even when not provided an extra `1rem` spacing is reserved at the bottom
   * to prevent the page from jumping when an error is displayed.
   */
  error?: string

  /**
   * The input element.
   */
  children: React.ReactNode
}

/**
 * Adds a label and an optional error message to an input.
 */
export default function LabeledInput(props: Props) {
  return (
    <div className="flex w-full flex-col items-baseline gap-3 text-on-primary">
      <div className="flex flex-row gap-1">
        <span className="text-base font-medium">{props.label}</span>
        {props.required && <span className="text-action-invalid">*</span>}
      </div>
      <div className="relative flex w-full flex-col gap-1 pl-2">
        {props.children}
        <span className="min-h-[1rem] pl-1 text-xs font-light text-action-invalid">
          {props.error}
        </span>
      </div>
    </div>
  )
}
