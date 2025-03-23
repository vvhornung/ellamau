'use client'
import React, {useEffect, useState} from 'react'
import {
    useStripe,
    useElements,
    PaymentElement
} from '@stripe/react-stripe-js'
import convertToSubCurrency from '@/app/lib/convertToSubCurrency'
import { CheckoutButton } from '../Cart/styles/CartSummary.styled'

const CheckoutPage = ({amount}) => {    
    const stripe = useStripe()
    const elements = useElements()

    const [errorMessage, setErrorMessage] = useState(null)
    const [clientSecret, setClientSecret] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchClientSecret = async () => {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({amount:convertToSubCurrency(amount)})
            })

            const data = await response.json()
            setClientSecret(data.clientSecret)
        }

        fetchClientSecret()
    }, [amount])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        if(!stripe || !elements){
            return
        }

        const {error:submitError} = await elements.submit()

        if(submitError){
            setErrorMessage(submitError.message)
            setLoading(false)
            return
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            paymentMethod: {
                card: elements.getElement(PaymentElement)
            },
            confirmParams: {
                return_url: 'http://localhost:3001/success'
            }
        })

        if(error){
            setErrorMessage(error.message)
            setLoading(false)
            return
        }

        setErrorMessage(null)
        setLoading(false)

        
    }

    return (
      <form>
        <PaymentElement />
        <CheckoutButton
          onClick={handleSubmit}
          type="submit"
          disabled={!stripe || loading}
        >
          {loading ? "Processing..." : `Pay $${amount}`}
        </CheckoutButton>

        {errorMessage && <div>{errorMessage}</div>}
      </form>
    );
}

export default CheckoutPage