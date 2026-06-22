import Image from "next/image";
import Link from "next/link";
import { LOGO_PATH, SITE_NAME } from "@/lib/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  height?: number;
  onDark?: boolean;
  href?: string;
};

export default function Logo({
  className = "",
  height = 32,
  onDark = false,
  href = "/",
}: LogoProps) {
  const width = Math.round((1200 / 260) * height);

  const image = (
    <Image
      src={LOGO_PATH}
      alt={SITE_NAME}
      width={width}
      height={height}
      priority
      className={cn("h-auto w-auto object-contain", onDark && "brightness-0 invert")}
      style={{ height, width: "auto", maxWidth: "min(240px, 55vw)" }}
    />
  );

  if (!href) {
    return <span className={cn("inline-flex shrink-0 items-center", className)}>{image}</span>;
  }

  return (
    <Link href={href} className={cn("inline-flex shrink-0 items-center", className)}>
      {image}
    </Link>
  );
}
