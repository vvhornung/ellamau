"use client";
import { useState, useEffect } from "react";
import { useElements } from "@stripe/react-stripe-js";
import { AddressElement } from "@stripe/react-stripe-js";
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CloseButton,
  Form,
  FormGroup,
} from "./styles/Modal.styled";
import ActionButton from "../shared/styles/ActionButton.styled";
import { StyledInput } from "../shared/styles/Input.styled";

const CheckoutModal = ({ isOpen, onClose, onSubmit, amount }) => {
  const elements = useElements();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [addressComplete, setAddressComplete] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Reset form state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormErrors({});
    }
  }, [isOpen]);

  const validateForm = async () => {
    const errors = {};

    // Validate name and email
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    // Validate address using Stripe Address Element
    if (elements) {
      const addressElement = elements.getElement("address");
      if (addressElement) {
        const { complete } = await addressElement.getValue();
        if (!complete) {
          errors.address = "Please complete your address information";
        } else {
          // Save the address complete status
          setAddressComplete(true);
        }
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleAddressChange = (event) => {
    if (event.complete) {
      setAddressComplete(true);
      // Clear address error if it exists
      if (formErrors.address) {
        setFormErrors((prev) => ({
          ...prev,
          address: undefined,
        }));
      }
    } else {
      setAddressComplete(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (await validateForm()) {
      // Get the address data from the Address Element
      const addressElement = elements.getElement("address");
      const { value: addressData } = await addressElement.getValue();

      // Ensure address fields are all defined to prevent potential issues
      // Create a properly structured order object without redundant fields
      const orderData = {
        name: formData.name,
        email: formData.email,
        phone: addressData.phone || "",
        address: {
          line1: addressData.address.line1 || "",
          line2: addressData.address.line2 || "",
          city: addressData.address.city || "",
          state: addressData.address.state || "",
          postal_code: addressData.address.postal_code || "",
          country: addressData.address.country || "",
        },
      };

      console.log("Address data being sent:", orderData.address);
      onSubmit(orderData);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <p>Complete Your Order</p>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <h2>Buyer Information</h2>
            <FormGroup>
              <label htmlFor="name">Full Name</label>
              <StyledInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              {formErrors.name && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {formErrors.name}
                </span>
              )}
            </FormGroup>

            <FormGroup>
              <label htmlFor="email">Email Address</label>
              <StyledInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
              {formErrors.email && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {formErrors.email}
                </span>
              )}
            </FormGroup>

            <FormGroup>
              <h2>Shipping Information</h2>
              <AddressElement
                options={{
                  mode: "shipping",
                  fields: {
                    phone: "always",
                  },
                  validation: {
                    phone: {
                      required: "always",
                    },
                  },
                }}
                onChange={handleAddressChange}
              />
              {formErrors.address && (
                <span style={{ color: "red", fontSize: "0.8rem" }}>
                  {formErrors.address}
                </span>
              )}
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <ActionButton
            style={{ padding: "1rem", fontWeight: "bold" }}
            $primaryColor="black"
            $secondarycolor="white"
            type="button"
            onClick={onClose}
          >
            Cancel
          </ActionButton>
          <ActionButton
            style={{
              backgroundColor: "black",
              padding: "1rem",
              fontWeight: "bold",
            }}
            $secondarycolor="white"
            type="button"
            onClick={handleSubmit}
          >
            Continue to Pay ${amount}
          </ActionButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CheckoutModal;
