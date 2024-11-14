import { cn } from "@/lib/utils";
import { UserIcon } from "lucide-react";

export default function UserAuth({
  className,
  toggle,
}: {
  className: string;
  toggle: () => void;
}) {
  return (
    <button onClick={toggle} className={cn(className)}>
      <UserIcon />
    </button>
  );
}
