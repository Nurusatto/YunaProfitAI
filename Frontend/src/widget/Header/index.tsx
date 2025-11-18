import { useBreakpoint } from "@/shared/hooks/useBreakPoint";
import { HeaderDesktop } from "./ui/desktop";
import { HeaderMobile } from "./ui/mobile";

export const Header = () => {
  const bp = useBreakpoint();

  if (bp === "desktop" || bp === "laptop") {
    return <HeaderDesktop />;
  } else {
    return <HeaderMobile />;
  }
};
