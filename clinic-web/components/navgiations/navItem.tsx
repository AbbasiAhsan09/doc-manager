import { NavItem } from '@/types/utils/navigation'
import React from 'react'
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';

type Props = {
    items : NavItem[]
    expanded?:boolean
}

const SideNavItems = (props : Props) => {
  
    const {expanded,items} = props;

    const router = useRouter()

    const handleOnItemClick = (item : NavItem) =>{
        router.push(item.link)
    }

    return (
    <>
    <div className="side-nav-items">
  
    { items.map((item, i) => {
        return(
            <>
                 <div className={i ===0 ? 'side-nav-item active' : 'side-nav-item'} onClick={() => handleOnItemClick(item)}>
                    {item?.icon && <Icon icon={item.icon}/>}
                    <span className='side-nav-text'>{item.name}</span>
                </div>
            </>
        )
    })
    }
    </div>
    </>
  )
}

export default SideNavItems