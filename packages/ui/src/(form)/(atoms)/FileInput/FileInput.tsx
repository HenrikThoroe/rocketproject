'use client'

import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../../../(media)/Icon/Icon'

type FileType<T extends boolean> = T extends true ? File[] : File

interface Props<T extends boolean = false> {
  /**
   * Id to use for the input element.
   * When using multiple file uploads,
   * different IDs must be used. Otherwise
   * only the first input will receive the
   * files, while the other act like proxies.
   *
   * @default 'file-input'
   */
  id?: string

  /**
   * Whether the input is required.
   */
  required?: boolean

  /**
   * Description of the file type used for the description inside the upload box.
   *
   * For example "video" or "image".
   */
  fileTypeDescription?: string

  /**
   * Whether the input accepts multiple files.
   */
  multiple?: T

  /**
   * List of accepted file types.
   *
   * For example ".zip", ".png" or ".jpg,.png".
   */
  acceptedFileTypes?: string

  /**
   * Called when the user uploads a file.
   */
  onUpload?: (file: FileType<T>) => void
}

/**
 * A styled, type-safe file input field.
 *
 * The `FileInput` is intended to be used with custom upload logic.
 * It provides a styled, clickable dropzone for file(s) and calls
 * the `onUpload` callback when the user selects a file.
 */
export default function FileInput<T extends boolean = false>(props: Props<T>) {
  const ref = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<string | null>(null)
  const [invalid, setInvalid] = useState<boolean>(props.required ? true : false)
  const id = props.id ?? 'file-input'

  //* Event Handler

  useEffect(() => {
    const input = ref.current

    if (input) {
      input.addEventListener('change', async () => {
        if (props.multiple) {
          const files = Array.from(input.files ?? [])
          const name = `${files.length} file${files.length > 1 ? 's' : ''} selected`

          if (files.length > 0) {
            setInvalid(false)
            setFile(name)
            props.onUpload && props.onUpload(files as FileType<T>)
          }
        } else {
          const file = input.files?.item(0)

          if (file) {
            setInvalid(false)
            setFile(file.name)
            props.onUpload && props.onUpload(file as FileType<T>)
          }
        }
      })
    }
  }, [])

  //* UI

  const Preview = () => (
    <div className="text-action-primary hover:text-action-primary-active flex flex-row items-center justify-center gap-2 rounded-lg bg-gray-200 p-3">
      <Icon name={file ? 'attach' : 'upload'} />
      {file && <span className="text-base font-medium">{file}</span>}
    </div>
  )

  //* Render

  return (
    <label
      htmlFor={id}
      className={classNames(
        'flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded border-4 border-dashed  px-6 py-12',
        {
          'border-action-invalid': invalid,
          'border-gray-300': !invalid,
        },
      )}
    >
      <Preview />
      <div className="text-on-primary flex flex-col items-center justify-center gap-2 text-base">
        <span>Drag and drop your {props.fileTypeDescription ?? 'file'} here, or</span>
        <span className="text-blue-800 hover:text-blue-600">click to select a file.</span>
      </div>
      <input
        type="file"
        accept={props.acceptedFileTypes}
        multiple={props.multiple ?? false}
        className="hidden"
        id={id}
        ref={ref}
        required={props.required}
      />
    </label>
  )
}
