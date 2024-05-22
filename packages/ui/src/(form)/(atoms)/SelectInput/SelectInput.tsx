'use client'

interface Props<T extends string> {
  /**
   * Set of options available for the user to choose
   */
  options: Option<T>[]

  /**
   * Called when the selection changes.
   * The value of the selected option is passed as an argument.
   */
  onSelect?: (value: T) => void

  /**
   * Default value of the input
   */
  defaultValue?: T
}

export interface Option<T extends string> {
  /**
   * Option key
   */
  value: T

  /**
   * Display label
   */
  label: string
}

/**
 * A styled, type-safe select input field.
 */
export default function SelectInput<T extends string>(props: Props<T>) {
  return (
    <select
      onChange={(e) => props.onSelect && props.onSelect(e.target.value as T)}
      className="form-input bg-primary focus:border-action-primary-active w-full rounded-lg border-2 border-gray-300 text-base focus:ring-0"
    >
      {props.options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          selected={option.value === props.defaultValue}
        >
          {option.label}
        </option>
      ))}
    </select>
  )
}
