"use client";
import {
  ModalOverlay,
  ErrorModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  ErrorTitle,
  ErrorMessage,
} from "./styles/Modal.styled";
import ActionButton from "../shared/styles/Button.styled";

const ErrorModal = ({ isOpen, onClose, errorMessage }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ErrorModalContainer>
        <ModalHeader>
          <ErrorTitle>Payment Error</ErrorTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
          <ErrorMessage>
            {errorMessage ||
              "An error occurred during the payment process. Please try again."}
          </ErrorMessage>
        </ModalBody>

        <ModalFooter>
          <ActionButton
            style={{ padding: "1rem" }}
            $primaryColor="black"
            secondarycolor="black"
            onClick={onClose}
          >
            Close
          </ActionButton>
        </ModalFooter>
      </ErrorModalContainer>
    </ModalOverlay>
  );
};

export default ErrorModal;
