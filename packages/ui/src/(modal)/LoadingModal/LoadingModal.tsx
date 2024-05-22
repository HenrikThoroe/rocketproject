import Modal, { ModalProps } from '../Modal/Modal'

/**
 * Modal that displays a loading indicator.
 *
 * Should be used when the user needs to wait for a process to finish.
 * It prevents the user from interacting with the application.
 */
export default function LoadingModal(props: Omit<ModalProps, 'children' | 'onClose'>) {
  return (
    <Modal {...props} onClose={() => {}}>
      <div className="flex flex-col items-center justify-center gap-8 p-8">
        <div className="flex flex-row items-center justify-center gap-6">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-action-primary"></div>
          <div className="flex flex-row gap-[.1rem] text-lg font-medium text-on-primary">
            <span>Loading</span>
            <span className="h-[1rem] animate-bounce">.</span>
            <span className="h-[1rem] animate-bounce-d-1 ">.</span>
            <span className="h-[1rem] animate-bounce-d-2 ">.</span>
          </div>
        </div>
        <span className="text-center text-sm text-on-primary-light">
          The fax jammed, please wait while we are sending our fastest pigeons to deliver your
          message!
        </span>
      </div>
    </Modal>
  )
}
