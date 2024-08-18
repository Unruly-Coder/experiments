"use client";
import {SubMenu} from "@/components/SubMenu/SubMenu";
interface Props {
  children?: React.ReactNode;
}
export default function Layout({children}: Props) {
  return (
    <>
      {children}
      <SubMenu items={[
        {name: "Flag", href: "/experiments/three-js-journey/1"},
        {name: "Sea", href: "/experiments/three-js-journey/2"},
      ]}/>

    </>
  );
}