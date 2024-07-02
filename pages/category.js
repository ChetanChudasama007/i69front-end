import React from 'react'
import dynamic from 'next/dynamic'
const Category = dynamic(() => import('../src/views/Category'))

const CategoryPage = () => {
  return (
    <>
      <Category/>
    </>
  )
}

export default CategoryPage
