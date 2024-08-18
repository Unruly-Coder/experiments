"use client"

import s from './TransitionWrapper.module.css';
import cn from 'classnames';
import {
  useState,
  createContext,
  useContext,
  useCallback,
  Dispatch,
  SetStateAction,
  useTransition,
  useEffect
} from "react";
import Link, {LinkProps} from "next/link";
import {useRouter, usePathname} from "next/navigation";

import {wait} from "@/utils/wait";
import {createObserver} from "@/utils/createObserver";

interface Props {
  children: React.ReactNode;
}

type TransitionState = 'enter' | 'exit' | 'idle';


const TransitionContext = createContext<[TransitionState, Dispatch<SetStateAction<TransitionState>>]>(['idle', () => {}]);

export function TransitionContextProvider({children}: Props) {

  const [state, setState] = useState<TransitionState>('idle');
  
  return (
    <TransitionContext.Provider value={[state, setState]}>
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransitionContext() {
  return useContext(TransitionContext);
}

export function TransitionWrapper({children}: Props) {
  
  const [state] = useTransitionContext();
  
  return (
    <div className={cn(s.wrapper, state === "enter" && s.enter, state === "exit" && s.exit)}>
        {children}
    </div>
  )
}

interface TransitionLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  enterTransitionClassName?: string;
}

const routerObserver = createObserver();

export function TransitionLink({children, href, className, enterTransitionClassName, ...props}: TransitionLinkProps) {
  const [state, setState] = useTransitionContext();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  
  const asyncPush = useCallback(async (href: string) => {
    return new Promise((resolve) => {
      startTransition(() => router.push(href));
      routerObserver.setObserver(() => {
        resolve(undefined);
      });
    });
  }, [router]);

  useEffect(() => {
    if(!isPending) {
      routerObserver.notify();
    }
  }, [isPending]);
  
  const onClickHandler = useCallback(async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    if (state !== 'idle' || pathname === href) {
      return;
    }
    setState('enter');
    await wait(350);
    await asyncPush(href);
    setState('exit');
    await wait(500);
    setState('idle');
  }, [setState, asyncPush, state, href, pathname]);
  
  return (
    <Link href={href} onClick={onClickHandler} className={cn(className, state === "enter" && enterTransitionClassName)} {...props}>
      {children}
    </Link>
  )
}