import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";

import HomeFinal from "../../../Components/UPSC/Home";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
const router = useRouter();
const { page } = router.query;
const currentPage = parseInt(page, 10) || 1;
const isHomePage = currentPage === 1;

useEffect(() => {
  if (data === "No Data") {
    router.push("/nonexistentpage");
  }
}, [data, router]);

if (data === "No Data") {
  return null; // Return null to prevent rendering the component before redirecting
}
  return (
    <div>
      <Head>
        <title>Josh Talks - UPSC</title>
        <meta name="description" content="My home page description" />
      </Head>
      <main className="">
        <HomeFinal data={data} currentPage={currentPage} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { page } = query;
  const currentPage = parseInt(page, 10) || 1;

  try {
    const response = await fetch(
      `https://upsc.joshtalks.org/api/v1/blogs/?page_size=${currentPage}`
    );
    const data = await response.json();
    if (data && data.detail && data.detail.includes("Invalid")) {
      return {
        props: {
          data: "No Data",
        },
      };
    }
    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: "No Data",
      },
    };
  }
}

export async function getServerSidePaths() {
  const response = await fetch("https://upsc.joshtalks.org/api/v1/blogs/");
  const data = await response.json();

  const totalPages = Math.ceil(data.count / 10);

  const paths = Array.from({ length: totalPages }, (_, index) => ({
    params: { page: (index + 1).toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}
