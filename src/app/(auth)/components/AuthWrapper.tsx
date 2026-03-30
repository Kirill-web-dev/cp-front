"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState, type ReactNode } from "react";

interface IAuthWrapperProps {
  title: string;
  description: string;
  backButtonHref: string;
  backButtonTitle: string;
  backButtonText: string;
  children: ReactNode;
}

export default function AuthWrapper({ backButtonHref, backButtonText, backButtonTitle, children, description, title }: IAuthWrapperProps) {
  return (
    <Card className="w-[320px] md:w-105">
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription dangerouslySetInnerHTML={{ __html: description }} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex items-center justify-center">
        <div className="flex items-center gap-2">
          <p>{backButtonText}</p>
          <Separator orientation="vertical" className="bg-black" />
          <Button asChild variant={"outline"}>
            <Link href={backButtonHref}>{backButtonTitle}</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
