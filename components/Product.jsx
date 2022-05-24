import React from 'react'

import Link from "next/link"
import Image from "next/image"

import { urlFor } from '../lib/client'

const Product = ({product:{image,name,slug,price}}) => {
  return (
    <div>
        <Link href={`/product/${slug?.current}`}>
            <div className="product-card">
                <img src={urlFor(image && image[0])} alt={name} width={250} height={250} className="product-image" />
                <p className="product-name">{name}</p>
                <div className="product-price">${price}</div>
            </div>
        </Link>
    </div>
  )
}

export default Product