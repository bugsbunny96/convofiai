 "use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { TeamAccountCreate, TeamMemberCreate } from '../services/team-realms';
import ConvofiAI from "/public/ConvofiAI.svg";
import Image from "next/image";





const createBusinessAccount = () => {

const router = useRouter();

const [name, setName]= useState('')
const [mail, setMail] = useState('')
const [mobile, setMobile] = useState('')
const [asset, setAsset] = useState(null)
const [loading, setLoading] = useState(false)
const [error, setError] = useState("");
const [success, setSuccess] = useState("");


useEffect(()=>{
    const user = JSON.parse((localStorage.getItem("convofyai_user")))
    setAsset(user)
},[])

// console.log(asset)

const handleCreateAccount = async()=>{

    if(!name || !mail || !mobile){
        alert("please add inputs to all field")
    }
    
    var response = await TeamAccountCreate({name, mail, mobile})
    if(response.stat)
    {
        //  console.log(response)
        var datx = {
            team:response?.data?.item, 
            user: {name:asset.name, mail:asset.mail, item: asset.item},
            role: "admin"
        }
        var res = await TeamMemberCreate(datx)
        // console.log(res)
        if(res.stat){
            router.push("/select-account")
        }
    }
    else{
        alert("Internal server Error")
    }
}

const handleBack = ()=>{
  router.push("/select-account")
}


  return (

  <div className="h-screen w-screen flex items-center justify-center bg-gray-50 px-4">      

      <div className="flex flex-col gap-5 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        
        <div className="flex justify-center mb-6 w-full">
            <div className="h-12 w-36 relative">
              <Image src={ConvofiAI} alt="ConvofyAI Logo" fill style={{ objectFit: 'contain' }} priority />
            </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            id="name"
            type="text"
            required
            placeholder="Company Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-base px-3 py-2 bg-gray-50 transition placeholder-gray-400"
            disabled={loading}
            autoComplete="name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@email.com"
            value={mail}
            onChange={e => setMail(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-base px-3 py-2 bg-gray-50 transition placeholder-gray-400"
            disabled={loading}
            autoComplete="email"
          />
        </div>

        <div>
          <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
          <input
            id="mobile"
            type="tel"
            inputMode="tel"
            required
            pattern="^\+[1-9]\d{1,14}$"
            placeholder="+1234567890"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-base px-3 py-2 bg-gray-50 transition placeholder-gray-400"
            disabled={loading}
            autoComplete="tel"
          />
          <p className="text-xs text-gray-400 mt-1">
            Enter your mobile in international format, e.g. <span className="font-mono">+91987654</span>
          </p>
        </div>

        {error && <div className="text-red-500 text-sm text-center mt-1">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center mt-1">{success}</div>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold text-base mt-2 shadow-sm hover:bg-blue-700 transition disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={loading}
          onClick={handleCreateAccount}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>

        <button className='btn' onClick={handleBack}>Back</button>
      </div>
    </div>


   
  )
}

export default createBusinessAccount