import React from 'react'
import { client } from '../lib/client'

import {Product,Cart,HeroBanner,Footer,FooterBanner,Navbar,Layout} from "../components"

const Index = ({products,bannerData}) => {
  
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((d)=>(
          <Product product={d} key={d._id} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
}

export async function getServerSideProps(){
  const query='*[_type=="product"]'
  const products=await client.fetch(query)

  const bannerquery='*[_type=="banner"]'
  const bannerData=await client.fetch(bannerquery)

  return {
    props:{
      products,bannerData
    }
  }

}

export default Index
