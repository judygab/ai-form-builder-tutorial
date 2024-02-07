import React from 'react'
import Image from 'next/image'
import FormGenerator from '../form-generator'
import PlausibleProvider from 'next-plausible'

type Props = {}

const LandingPage = (props: Props) => {
  return (
    <PlausibleProvider domain={process.env.PLAUSIBLE_DOMAIN || ""}>
      <section className="flex flex-col items-center justify-center space-y-4 pt-4 sm:pt-24 w-full bg-[url('/grid.svg')]" id="hero">
        <h1 className='text-4xl font-bold text-center tracking-tighter sm:text-5xl md:text-6xl leading-6'>Create your forms <br></br>in seconds not hours</h1>
        <p className='max-w-[600px] mt-4 text-center text-gray-500 md:textl-xl'>
          Generate, publish and share your form right away with AI. Dive into insightful results, charts and analytics.
        </p>
        <FormGenerator />
        <div className='w-full bg-gradient-to-b from-transparent to-white h-24'></div>
      </section>
      <section className='flex flex-col items-center justify-center space-y-4 mt-12 pb-24' id="features">
        <h2 className='text-3xl font-bold text-center tracking-tighter sm:text-4xl md:text-5xl'>How It Works</h2>
        <ul className='grid gap-4 grid-cols-1 md:gridcols-2 lg:grid-cols-3 w-full max-w-5xl text-center'>
          <li className='flex flex-col items-center space-y-4 relative'>
            <Image
              src="/images/app/demo1.png"
              width="250"
              height="250"
              alt="create a form"
              className='bg-white p-4 shadow-sm border rounded-md'
            />
            <Image src="/arrow.svg"
              width="125"
              height="125"
              alt="arrow"
              className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2" />
            <p>1. Add a prompt and describe the requirements for your form.</p>
          </li>
          <li className='flex flex-col items-center space-y-4 relative'>
            <Image
              src="/images/app/demo4.png"
              width="250"
              height="250"
              alt="update the form"
              className='bg-white p-4 shadow-sm border rounded-md'
            />
            <Image src="/arrow.svg"
              width="125"
              height="125"
              alt="arrow"
              className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 scale-x-[-1] rotate-180" />
            <p>2. Generate the form.</p>
          </li>
          <li className='flex flex-col items-center space-y-4 relative'>
            <Image
              src="/images/app/demo4.png"
              width="250"
              height="250"
              alt="check the analytics"
              className='bg-white p-4 shadow-sm border rounded-md'
            />
            <p>3. Check results, analytics and more.</p>
          </li>
        </ul>
      </section>
    </PlausibleProvider>
  )
}

export default LandingPage