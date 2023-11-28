"use client"

import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { BillboardColumn, columns } from './columns'
import { ApiList } from '@/components/ui/api-list'

interface BillboardClientProps {
    data: BillboardColumn[]
}

const BillboardClient = ({
    data
}: BillboardClientProps) => {
    const router = useRouter();
    const params = useParams();


  return (
    <>
        <div className='flex items-center justify-between'>
            <Heading 
                title={`Billboard (${data.length})`}
                description="Manage your billboard"
            /> 
            <Button 
                onClick={() => router.push(`/${params.storeId}/billboards/new`) }
            >
                <Plus className='mr-2 h-4 w-4'/>
                Create new billboard
            </Button>
        </div>
        <Separator />
        <DataTable 
            columns={columns}
            data={data}
            searchKey='label'
        />
        <Heading 
            title='API List'
            description='API calls for billboards'
        />
        <Separator />
        {/* API LIST */}
        <ApiList
            entityName = "billboards"
            entityIdName= "billboardId"
        />
        
        
    </>
  )
}

export default BillboardClient;