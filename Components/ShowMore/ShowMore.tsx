'use client'
import React from 'react'
import { useShowMoreHooks } from './hooks'
import { CustomButton } from '..'
import { FilterProps } from '@/types'

interface Props {
    pageNumber: number
    isNext: boolean
    setFilter: (values: FilterProps) => void
    filter: FilterProps
}

const ShowMore = (props : Props ) => {
    const {pageNumber, isNext, setFilter, filter} = props
    const { handleNavigation} = useShowMoreHooks({pageNumber, isNext, setFilter, filter})

  return (
    <div className='w-full flex-center gap-5 mt-10'>
      {!isNext && (
          <CustomButton title='Show More' handleClick={handleNavigation} btnType='button' containerStyles='bg-primary-blue text-white rounded-full'/>
      )}
    </div>
  )
}

export default ShowMore
