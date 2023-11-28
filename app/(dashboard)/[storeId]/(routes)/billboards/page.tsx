import React from 'react'
import BillboardClient from './components/billboard-client'
import db from '@/lib/prismadb'
import { BillboardColumn } from './components/columns'
import { format } from 'date-fns'

interface BillboardsPageProps {
    params: {storeId: string}
}

const BillboardsPage: React.FC<BillboardsPageProps> = async ({
    params
}) => {

    const billboards = await db.billboard.findMany({
        where: {
            storeId: params.storeId
        }, 
        orderBy: {
            createdAt: "desc"
        }
    })

    const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))
  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-9 p-8 pt-6 '>
            <BillboardClient data={formattedBillboards} />
        </div>
    </div>
  )
}

export default BillboardsPage;