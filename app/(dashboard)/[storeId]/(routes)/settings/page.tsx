import db from "@/lib/prismadb";
import SettingsForm from "./components/settings-form";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation"


interface SettingsPageProps {
    params: {storeId: string}
}

const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
}) => {

    const {userId} = auth()

    if (!userId) {
        redirect("/sign-up")
    }

    const activeStore = await db.store.findFirst({
        where: {
            id: params.storeId,
            userId,
        }
    })

    if (!activeStore) {
        redirect("/")
    }
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-8 p-8 pt-6">
                <SettingsForm
                    initialData = {activeStore} 
                />
            </div>
        </div>
    )
}

export default SettingsPage;