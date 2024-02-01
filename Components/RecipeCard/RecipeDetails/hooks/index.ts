import { ExtendedSession } from "@/types";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation"

const useRecipeDetailsHooks = () => {
    const pathName = usePathname();
    const {data: session } : {data: ExtendedSession | null} = useSession();
    return { pathName, session };
}

export default useRecipeDetailsHooks
