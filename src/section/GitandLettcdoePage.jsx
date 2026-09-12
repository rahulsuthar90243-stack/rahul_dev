import React from 'react'
import LeetCode from "../components/LeetCode"
import Github from "../components/github"

function GitandLettcdoePage() {
  return (
    <div className='w-full justify-center px-4 py-16 flex items-center justify-center relative bg-black text-white overflow-hidden'>
      <div className='w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <LeetCode />
        <Github />
      </div>
    </div>
  )
}

export default GitandLettcdoePage