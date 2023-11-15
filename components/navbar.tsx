import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import NavRoutes from './nav-routes'
import StoreSwitcher from './store-switcher'
import db from '@/lib/prismadb'

const Navbar = async () => {
    const {userId} = auth()

    if (!userId) {
        redirect("/sign-up")
    }

    const stores = await db.store.findMany({
        where: {
            userId
        }
    })

  return (
    <div className='border-b'>
        <div className='flex items-center px-4 h-16 '>
            <div className='mr-3'>
                <StoreSwitcher items={stores} />
            </div>
            <NavRoutes className="mx-6" />
            <div className='ml-auto flex '>
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    </div>
  )
}

export default Navbar