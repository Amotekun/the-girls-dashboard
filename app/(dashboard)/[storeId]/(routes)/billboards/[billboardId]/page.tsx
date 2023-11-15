import React from 'react'
import BillboardForm from './components/billboard-form'
import db from '@/lib/prismadb'

interface SingleBillboardPageProps {
  params: {billboardId : string}
}

const SingleBillboardPage: React.FC<SingleBillboardPageProps> = async ({params}) => {
  const billboard = await db.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  })

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-10'>
        <BillboardForm initialData={billboard}/>
      </div>
    </div>
  )
}

export default SingleBillboardPage