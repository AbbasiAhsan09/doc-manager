import React from 'react'

type Props = {
    label : string;
    icon ? : string;
    onClick : () => void;
    variant : 'primary' | 'secondary' | 'info' | 'danger' | 'success'
} 

const AppButton = (props : Props) => {
  
    const {label, onClick,variant,icon} = props


    return (
    <button onClick={onClick}>
        {label}
    </button>
  )
}

export default AppButton