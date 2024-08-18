import s from './SubMenu.module.css';
import {usePathname} from "next/navigation";
import {TransitionLink} from "@/components/TransitionWrapper";

interface Props {
  items: {name: string, href: string}[];
}

export function SubMenu({items}: Props) {

  const pathname = usePathname();
   
  return (
    <ul className={s.list}>
      {items.map((item, index) => (
        <li key={item.name} className={pathname === item.href ? s.active : ''}>
          <TransitionLink href={item.href}>{item.name}</TransitionLink>
        </li>)
      )}
    </ul>
  );
}