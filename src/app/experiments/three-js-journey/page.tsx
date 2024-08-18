"use client";

import {useRouter} from "next/navigation";
import {useLayoutEffect} from "react";

export default function Page() {
  
    const router = useRouter();
    useLayoutEffect(() => {
        router.replace('/experiments/three-js-journey/1');
    }, [router]);
  
    return null;
}