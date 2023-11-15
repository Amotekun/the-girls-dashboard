import db from "@/lib/prismadb";

interface DashBoardProps {
    params: {storeId: string}
}

const DashboardPage = async ({params}: DashBoardProps) => {
    
    return (
        <div>
            {params.storeId}
            This is Dashboard Page
        </div>
    )
}

export default DashboardPage;