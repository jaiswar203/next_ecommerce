import React from 'react'
import { useState } from 'react'

import { AiOutlineMinus, AiOutlinePlus, AiOutlineStar, AiFillStar } from "react-icons/ai"
import { Product } from '../../components'
import { client, urlFor } from "../../lib/client"

import { useStateContext } from '../../context/stateContext'

const ProductDetail = ({ product, products }) => {
  const { image, name, details, price } = product

  const [index, setIndex] = useState(0)

  const {decQty,incQty,qty,onAdd,setShowCart}=useStateContext()

  const handleBuyNow=()=>{
    onAdd(product,qty)

    setShowCart(true)
  }
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className='image-container'>
            <img src={urlFor(image && image[index])} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item,i)=>(
              <img src={urlFor(item)} key={i} className={i===index ? "small-image selected-image": "small-image"} onMouseEnter={()=>setIndex(i)} />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
          </div>
          <p>(20)</p>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className='num' >
                {qty}
              </span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type='button' className='add-to-cart' onClick={()=>onAdd(product,qty)}>Add to Cart</button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item)=>(
              <Product product={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const query = `*[_type=="product"] {
    slug {
      current
    }
  }`

  const products = await client.fetch(query)

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current
    }
  }))

  return {
    paths,
    fallback: "blocking"
  }
}

export async function getStaticProps({ params: { slug } }) {
  const query = `*[_type=="product" && slug.current=='${slug}'][0]`
  const product = await client.fetch(query)

  const productQuery = '*[_type=="product"]'
  const products = await client.fetch(productQuery)

  const refactoredProducts=products?.filter((item)=>item._id!==product._id)
  return {
    props: {
      product, products: refactoredProducts
    }
  }
}

export default ProductDetail