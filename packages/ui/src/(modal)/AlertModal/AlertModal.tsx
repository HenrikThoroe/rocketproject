'use client'

import { Dialog } from '@headlessui/react'
import classNames from 'classnames'
import Icon, { IconName } from '../../(media)/Icon/Icon'
import Modal, { ModalProps } from '../Modal/Modal'

export interface ActionModalProps extends Omit<ModalProps, 'children'> {
  /**
   * Title of the modal.
   */
  title: string

  /**
   * Alert message to display.
   */
  description: string

  /**
   * Visual variant of the alert.
   */
  variant: 'primary' | 'error'

  /**
   * Used icon for the alert.
   */
  icon: IconName
}

/**
 * Modal that displays an alert message.
 *
 * Allows only for a confirmation action by the user.
 */
export default function AlertModal(props: ActionModalProps) {
  //* UI

  const Body = () => (
    <div className="bg-primary px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div
          className={classNames(
            'mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10',
            {
              'bg-red-100 text-action-destructive-active': props.variant === 'error',
              'bg-blue-100 text-action-primary-active': props.variant === 'primary',
            }
          )}
        >
          <Icon name={props.icon} />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
            {props.title}
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-500">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  )

  const Actions = () => (
    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
      <button
        type="button"
        className={classNames(
          'mt-3 inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-on-primary shadow-sm',
          'ring-1 ring-inset ring-gray-300',
          'hover:bg-gray-200 sm:mt-0 sm:w-auto'
        )}
        onClick={props.onClose}
      >
        Close
      </button>
    </div>
  )

  //* Render

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Body />
      <Actions />
    </Modal>
  )
}
