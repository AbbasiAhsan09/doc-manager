import { navItems } from '@/data/navigation/sidebar';
import React from 'react';
import SideNavItems from './navItem';

type Props = {
  expanded?: boolean;
};

const SideNav = (props: Props) => {
  const { expanded } = props;

  return (
    <>
       <SideNavItems items={navItems} expanded={expanded}/>
    </>
  );
};


export default SideNav;
