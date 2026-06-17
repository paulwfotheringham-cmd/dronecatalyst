import Image from "next/image";
import Link from "next/link";
import { LOGO_PATH, SITE_NAME } from "@/lib/site";

type LogoProps = {
  className?: string;
  height?: number;
};

export default function Logo({ className = "", height = 32 }: LogoProps) {
  const width = Math.round((1200 / 260) * height);

  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src={LOGO_PATH}
        alt={SITE_NAME}
        width={width}
        height={height}
        priority
        className="h-auto w-auto max-h-8 object-contain sm:max-h-9"
        style={{ height, width: "auto", maxWidth: "min(200px, 55vw)" }}
      />
    </Link>
  );
}
