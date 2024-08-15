"use client";

import s from './ExperimentPanel.module.css';
import Link from "next/link";
import {ChangeEventHandler, useCallback, useRef, useState} from "react";
import cn from "classnames";
import Image, {StaticImageData} from "next/image";
import {usePathname} from "next/navigation";

export interface Experiment {
  
  title: string;
  href: string;
  img: StaticImageData;
}
interface ExperimentPanelProps {
  experiments: Experiment[];
}
export function ExperimentPanel({experiments}: ExperimentPanelProps) {

  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  
  const toggleExpanded = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);
  
  const clearSearch = useCallback(() => {
    setSearchValue('');
    if(searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  
  const searchChange:ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setSearchValue(e.target.value);
  }, []);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  return (
    <aside className={cn(s['main-wrapper'], !isExpanded && s['collapsed'])}>
      <header className={s['header-wrapper']}>
        <Link href={'/'}><h1><span>PB</span></h1></Link>
        <button onClick={toggleExpanded}>
          <svg 
            width="24" 
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M10 7h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-8V7ZM9 7H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3V7ZM4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
              clipRule="evenodd"
            >
            </path>
          </svg>
        </button>
      </header>

      <section className={s['search-wrapper']}>
        <div className={s['search-input']}>
          <div className={s['search-icon']}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M15 10.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-.956 4.206a5.5 5.5 0 1 1 .662-.662.5.5 0 0 1 .148.102l3 3a.5.5 0 1 1-.707.707l-3-3a.5.5 0 0 1-.103-.147Z"
                clipRule="evenodd">
              </path>
            </svg>
          </div>
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="...Find" 
            value={searchValue} 
            onChange={searchChange}
          />
        </div>

        <button aria-label="Clear" onClick={clearSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg" width="12"
            height="12"
            viewBox="0 0 12 12">
            <path
              fillOpacity="1"
              fillRule="nonzero"
              stroke="none"
              d="m6 5.293 4.789-4.79.707.708-4.79 4.79 4.79 4.789-.707.707-4.79-4.79-4.789 4.79-.707-.707L5.293 6 .502 1.211 1.21.504 6 5.294z">
                </path>
            </svg>
        </button>
      </section>
      <section className={s['experiments-wrapper']}>
        <ul>
          {experiments.filter((e => {
            return e.title.toLowerCase().includes(searchValue.toLowerCase());
          })).map((e, index) => (
            <li key={index}>
              <ExperimentItem title={e.title} href={e.href} img={e.img} active={pathname === e.href}/>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

// function ExperimentsSection() {
//   return ()
// }


interface ExperimentItemProps {
  active?: boolean;
  title: string;
  href: string;
  img: StaticImageData;
}
function ExperimentItem({active, title, href, img}: ExperimentItemProps) {
  
  return (
    <Link href={href} className={cn(s['experiment-item'], active && s['active'])}>
        <h2>{title}</h2>
        <Image src={img} alt={"Experiment image"} priority={false} placeholder={"blur"}/>
    </Link>
  );
}