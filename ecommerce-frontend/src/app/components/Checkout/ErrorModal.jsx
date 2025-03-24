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
import { PrimaryButton } from "./styles/Button.styled";

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
          <PrimaryButton onClick={onClose}>Close</PrimaryButton>
        </ModalFooter>
      </ErrorModalContainer>
    </ModalOverlay>
  );
};

export default ErrorModal;
