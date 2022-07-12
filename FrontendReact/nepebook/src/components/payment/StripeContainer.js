import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import './Payment.css';

const PUBLIC_KEY = "pk_test_51KhVQ9Kx44qTfL05Y7qRY0pmrpF8X6s73hRU5gFhzRxcbH2oLhGJPFhA6OV238Yt9KGFZr6mimHbGOSpLxlJY9TB00AyYXoL1R";

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({ name }) {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm name={name} />
        </Elements>
    )
}
