import React from 'react';
import {CircleStar} from 'lucide-react';
import { Input } from "@/components/ui/input"

export default function Authentication() {
  return (
    <div className='place-items-center items-center text-center py-20 mx-auto max-w-130'>
        <CircleStar className='h-20 w-20 text-blue-600'/>
        <h2 className='text-xl font-bold py-3'>Welcome to Double-joy</h2>
        <p>Type your e-mail or phone number to log in or create a Jumia account.</p>
        <Input type="text" placeholder="Email or Phone number" className='w-100 p-6 m-10'/>
        <button className='block bg-blue-600 text-white p-3 w-100'>Continue</button>
        <p>By Continuing you agree to double-joy's</p>
        <a href="" className='underline text-blue-600'>Terms and Conditions</a><br/>
        <a href="" className='underline text-blue-600'>Privacy Policy</a>
    </div>
  )
}
