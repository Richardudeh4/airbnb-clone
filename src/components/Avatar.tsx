"use client";
import Image from 'next/image';
import React from 'react'

interface AvatarProps {
  src?: string | null | undefined;
}
const Avatar: React.FC<AvatarProps> = ({
  src
}) => {
  return (
<Image 
className='rounded-full'
height={30}
width={30}
alt="avatar"
src={src || "https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg?w=740"}/>
  )
}

export default Avatar