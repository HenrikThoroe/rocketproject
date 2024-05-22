'use client'

import React, { useState } from 'react'
import { ActionModalProps } from '../ActionModal/ActionModal'

interface ChildProps {
  onClick?: () => void
}

interface Props {
  /**
   * The modal to show when the child is clicked.
   */
  modal: React.ReactElement<ActionModalProps>

  children: React.ReactElement<ChildProps>
}

/**
 * Wraps a child and overrides its `onClick` handler
 * to show a modal instead.
 *
 * Automates the process of showing a modal when a
 * button is clicked, but performing the intended action
 * first when the user confirms it again in the modal.
 *
 * Common use cases are for example deleting an item
 * or sending a message.
 *
 * The child element must accept an `onClick` handler
 * but should not implement it itself, as it will be
 * overridden by this component. The logic should
 * be implemented in the modal instead.
 *
 * @example
 * ```tsx
 * <WithModal
 *   modal={
 *     <ActionModal
 *       title="Confirm Delete"
 *       description="This action is irreversible."
 *       icon="delete"
 *       action={{
 *         label: 'Action',
 *         onClick: delete,
 *         variant: 'destructive',
 *       }}
 *     />
 *   }
 * >
 *   <button>Delete Item</button>
 * </WithModal>
 * ```
 */
export default function WithModal(props: Props) {
  const { modal, children } = props
  const [show, setShow] = useState(false)

  return (
    <>
      {React.cloneElement(children, {
        onClick: () => {
          setShow(true)
        },
      })}
      {React.cloneElement(modal, {
        action: {
          ...modal.props.action,
          onClick: () => {
            setShow(false)
            modal.props.action.onClick()
          },
        },
        open: show,
        onClose: () => {
          setShow(false)
        },
      })}
    </>
  )
}
