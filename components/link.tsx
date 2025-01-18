import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CustomLinkProps = React.ComponentProps<typeof Link> & {
  className?: string;
};

export function CustomLink({ className, children, ...props }: CustomLinkProps) {
  return (
    <Link {...props} className={cn("text-blue-400 hover:underline", className)}>
      {children}
    </Link>
  );
}

