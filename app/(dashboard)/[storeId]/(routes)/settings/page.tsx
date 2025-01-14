import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { SettingsForm } from "./components/settings-form";
import { auth } from '@clerk/nextjs/server';
interface SettingdPageProps {
    params : {
        storeId: string;
    }
}




const SettingsPage: React.FC<SettingdPageProps> = async ({
    params
}) => {
    const { userId } = auth();

    if(!userId){
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    if(!store){
        redirect("/");
    }

    return ( 
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store}/>
            </div>
        </div>
     );
}
 
export default SettingsPage;