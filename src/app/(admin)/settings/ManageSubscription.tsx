"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';

const ManageSubscription = () => {
  const router = useRouter();

  const redirectToCustomerPortal = async () => {
    try {
      const response = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const { url } = await response.json();

      router.push(url.url);
    }
    catch (error) {
      console.error('Error redirecting to customer portal', error);
    }
  }


  return (
    <Button onClick={redirectToCustomerPortal}>Change your subscription</Button>
  )
}

export default ManageSubscription