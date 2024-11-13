import { cn } from "@/lib/utils";
import Link from "next/link";

type LayoutItems = {
  text: string | JSX.Element;
  path: string;
};
export default function RenderLayoutElement({
  layoutItems,
  className,
}: {
  layoutItems: LayoutItems[];
  className: string;
}) {
  const renderLayoutItem = layoutItems.map((layoutItem, index) => (
    <li key={index} className={cn(className)}>
      <Link href={layoutItem.path}>{layoutItem.text}</Link>
    </li>
  ));
  return (
    <>
      {layoutItems.map((layoutItem, index) => (
        <li key={index} className={cn(className)}>
          <Link href={layoutItem.path}>{layoutItem.text}</Link>
        </li>
      ))}
    </>
  );
}
