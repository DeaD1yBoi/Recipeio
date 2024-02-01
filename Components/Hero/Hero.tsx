'use client'
import React from 'react'
import { CustomButton } from '..'
import Image from 'next/image'
import useHeroHooks from './hooks'
import { FilterProps } from '@/types'

interface Props {
  setFilter: (values: FilterProps) => void;
}

const Hero = (props: Props) => {
  const { setFilter } = props
  const {handleScroll} = useHeroHooks({setFilter})
  return (
    <div className='hero'>
      <div className='flex-1 pt-12 px-8'>
        <h1 className='hero__title'>
            Find, create & share recipes
        </h1>

        <p className='hero__subtitle'>Different recipes for every occassion</p>
      <CustomButton
      title='Explore recipes'
      containerStyles='bg-primary-blue text-white rounded-full mt-10'
      handleClick={handleScroll}/>

      </div>
    </div>
  )
}

export default Hero
