import Layout from "@/components/Shared/Layout";
import Payments from "@/components/Payments/Payment";
import axios from "axios";
import Price from "@/components/Shared/Price";
import { parseCookies } from "nookies";

const PaymentPage = ({ data }) => {
  return (
    <Layout>
      <div className='py-5 px-6 sm:px-[40px] h-screen'>
        {data && data.length > 0 ? <Payments data={data} /> : <Price />}
      </div>
    </Layout>
  );
};

export default PaymentPage;

export async function getServerSideProps(ctx) {
  const cookies = parseCookies(ctx);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${cookies.jwt}`,
  };

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me?populate=*`,
      {
        headers,
      }
    );
    if (!data) {
      return {
        props: {
          data: null,
        },
      };
    }
    const payments = data.payments;

    return {
      props: { data: payments },
    };
  } catch (error) {
    console.error("Server-side props error:", error.message);
    return { props: { data: [] } };
  }
}
