import React from 'react'
import Blog1 from "../../assets/blog.jpg"
import Blog2 from "../../assets/blog2.jpg"
import Blog3 from "../../assets/blog3.jpg"
import Blog4 from "../../assets/blog4.jpg"
import { UpdateFollower } from 'react-mouse-follower'

const BlogData = [
    {
        id:1,
        title:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptatum officia ipsam sed nihil sequi voluptates doloremque reprehenderit dolorem, atque sunt, facere saepe maxime ea id suscipit iure! Tenetur, earum.",
        link:"#",
        img:Blog1
    },
    {
        id:2,
        title:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptatum officia ipsam sed nihil sequi voluptates doloremque reprehenderit dolorem, atque sunt, facere saepe maxime ea id suscipit iure! Tenetur, earum.",
        link:"#",
        img:Blog2
    },
    {
        id:3,
        title:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptatum officia ipsam sed nihil sequi voluptates doloremque reprehenderit dolorem, atque sunt, facere saepe maxime ea id suscipit iure! Tenetur, earum.",
        link:"#",
        img:Blog3
    },
    {
        id:4,
        title:"Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Et voluptatum officia ipsam sed nihil sequi voluptates doloremque reprehenderit dolorem, atque sunt, facere saepe maxime ea id suscipit iure! Tenetur, earum.",
        link:"#",
        img:Blog4
    },
]
function Blog() {
  return (
    <>
        <UpdateFollower mouseOptions={{backgroundColor:"black",zIndex:999,followSpeed:1.5,text:"read",textFontSize:"3px",scale:5}}>
            <section className='bg-gray-50 py-16'>
                <div className="container">
                    <h1 className='text-3xl font-bold text-center pb-8'>Blogs</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {
                        BlogData.map((data) =>{
                            return(
                                <div className="flex flex-col items-center justify-center gap-6 p-5 max-w-[300px] mx-auto shadow-lg rounded-md bg-white hover:-translate-y-2 duration-300 h-[400px]">
                                    <img src={data.img} alt="" className="w-full h-[200px] object-cover rounded-md" />
                                    <div className="space-y-2">
                                        <h1 className='text-xl font-bold line-clamp-2'>{data.title}</h1>
                                        <p>{data.title}</p>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </section>
        </UpdateFollower>
        
    </>
  )
}

export default Blog