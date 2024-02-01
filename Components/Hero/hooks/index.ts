import { FilterProps } from "@/types";
import { clearSearchParams } from "@/utils";
import { useRouter } from "next/navigation";

interface Props {
  setFilter: (values: FilterProps) => void;
}
const useHeroHooks = (props: Props) => {
  const router = useRouter();
  const { setFilter } = props;
  const handleScroll = () => {
    clearSearchParams({ setFilter, router });
  };
  return {
    handleScroll,
  };
};
export default useHeroHooks;
