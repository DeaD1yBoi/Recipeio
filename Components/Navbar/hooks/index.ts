import { BuiltInProviderType } from "next-auth/providers/index";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  useSession,
} from "next-auth/react";
import { useEffect, useState } from "react";

const useNavbarHooks = () => {
  const [providers, setProviders] = useState<null | Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return { session, providers, toggleDropdown, setToggleDropdown };
};

export default useNavbarHooks;
