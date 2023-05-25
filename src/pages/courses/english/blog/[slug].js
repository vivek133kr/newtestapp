import React from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import BlogDetails from "@/Components/Skills/BlogDetail/BlogDetail";

function Blog({ post, data }) {

  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <BlogDetails post={post} data={data} />
    </div>
  );
}

export async function getServerSideProps({ params }) {

  let { slug } = params;
  const res = await fetch(`https://upsc.joshtalks.org/api/v1/blogs/${slug}`);
  const post = await res.json();
  const response = await fetch("https://upsc.joshtalks.org/api/v1/blogs");
  const data = await response.json();
 
  return {
    props: {
      post: post,
      data: data,
    },
  
  };
  
}



export default Blog;
