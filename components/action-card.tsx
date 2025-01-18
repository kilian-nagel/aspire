import React from "react";
import { CustomLink } from "@/components/link";
import { cn } from "@/lib/utils"; // Assuming your `cn` utility is in utils

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ActionCardProps = {
  title: string;
  content: string;
  linkText: string;
  linkHref: string;
  className?: string;
};

export function ActionCard({ title, content, linkText, linkHref, className }: ActionCardProps) {
  return (
    <Card className={cn("flex-1", className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{content}</CardDescription>
        </CardHeader>
        <div className="flex-grow"></div>
        <CardFooter>
          <CustomLink href={linkHref}>
              {linkText}
          </CustomLink>
        </CardFooter>
    </Card>
  );
}

