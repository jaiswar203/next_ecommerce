import Stripe from "stripe";

const stripe=new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY)

export default async function handler(req,res){
    if(req.method==="POST"){
        // console.log(req.body)
        // const data=JSON.parse(req.body)
        
        try {
            const params={
                submit_type:"pay",
                mode:"payment",
                payment_method_types:['card'],
                billing_address_collection:'auto',
                shipping_options:[
                    {shipping_rate:"shr_1L2tEzSH7UGA7V5sQFh8qwsh"},
                    {shipping_rate:"shr_1L2tGvSH7UGA7V5sxpa6xUU5"}
                ],
                line_items: req.body.map((item)=>{
                    const image=item.image[0].asset._ref
                    const newImage=image.replace('image-','https://cdn.sanity.io/images/zs5nl4lt/production/').replace('-webp','.webp')

                    return {
                        price_data:{
                            currency: 'usd',
                            product_data:{
                                name: item.name,
                                images:[newImage]
                            },
                            unit_amount: item.price*100
                        },
                        adjustable_quantity:{
                            enabled:true,
                            minimum:1
                        },
                        quantity: item.quantity,
                        tax_rates: ['txr_1L2zIFSH7UGA7V5sHkTkN0eM']
                    }
                }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
            }
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session)
        } catch (err) {
            // console.log(error)
            res.status(err.statusCode || 500).json(err.message);
        }
    }else{
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}


