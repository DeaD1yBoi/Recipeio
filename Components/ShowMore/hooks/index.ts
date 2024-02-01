import { FilterProps } from "@/types";
import { addSearchParams } from "@/utils";
import { useRouter } from "next/navigation";

interface Props {
    pageNumber: number
    isNext: boolean
    setFilter: (values: FilterProps) => void
    filter: FilterProps

}


export const useShowMoreHooks = (props : Props) => {
    const {pageNumber, setFilter, filter} = props
    const router = useRouter();
    const handleNavigation = () => {

        const newLimit = (pageNumber + 1) * 8;
        const newPathName = addSearchParams("limit", `${newLimit}`,);
        setFilter({...filter, limit: newLimit})
        router.push(newPathName, { scroll: false });
        console.log({pageNumber, newLimit, newPathName});
    }
    return {handleNavigation}
}
