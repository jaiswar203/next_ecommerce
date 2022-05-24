export default {
    name:"product",
    title: "Product",
    type:"document",
    fields:[
        {
            name:"image",
            title:"Image",
            type:"array",
            of:[{type:"image"}],
            options:{
                hotspot: true
            }
        },
        {
            name:"name",
            title:"Name",
            type:"string"
        },
        {
            name:"slug",
            title:"Slug",
            type:"slug",
            options:{
                source:'name',  // generate unique slug based on name field,
                maxLength:90
            }
        },
        {
            name:"price",
            title:"Price",
            type:"string"
        },
        {
            name:"details",
            title:"Details",
            type:"string"
        }
    ]
}