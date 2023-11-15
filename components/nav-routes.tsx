"use client"

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const NavRoutes = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {
    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}`,
            label: "Dashboard",
            active: pathname === `/${params.storeId}`

        },
        {
            href: `/${params.storeId}/billboards`,
            label: "Billboard",
            active: pathname === `/${params.storeId}/billboards`
        },
    ]
  return (
    <nav className='mx-4 space-x-2'>
        {routes.map((route) => (
            <Link
                href={route.href}
                key={route.href}
                className={cn()}
            >
                {route.label}
            </Link>
        ))}
    </nav>
  )
}

export default NavRoutes