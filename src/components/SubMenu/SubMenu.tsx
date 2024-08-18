import Link from "next/link";
import s from './SubMenu.module.css';
import {usePathname} from "next/navigation";

interface Props {
  items: {name: string, href: string}[];
}

export function SubMenu({items}: Props) {

  const pathname = usePathname();
   
  return (
    <ul className={s.list}>
      {items.map((item, index) => (
        <li key={item.name} className={pathname === item.href ? s.active : ''}>
          <Link href={item.href}>{item.name}</Link>
        </li>)
      )}
    </ul>
  );
}