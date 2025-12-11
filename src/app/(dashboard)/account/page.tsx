import React from 'react'
import Title from '../_components/title'
import { User } from 'lucide-react'

export default function account() {
    return (
        <Title title="Account Settings" icon={<User className='w-full h-full' />} />
    )
}
