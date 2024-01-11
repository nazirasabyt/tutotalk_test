import Layout from "@/components/Shared/Layout";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const PaymentSuccessful = () => {
  const router = useRouter();
  let id = "individual";

  // const headers = {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${auth.jwt}`,
  // };

  // try {
  //   const { data } = await axios.put(
  //     `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/${auth?.user.id}`,
  //     profileState,
  //     { headers }
  //   );
  //   setProfileState(data);
  //   updateUser(data);
  //   toast.success("Your information updated successfully", {
  //     hideProgressBar: true,
  //   });
  // } catch (err) {
  //   console.log("An error occurred while updating user information:", err);
  //   toast.error(err.message, {
  //     hideProgressBar: true,
  //   });
  // }

  return (
    <Layout>
      <div className='flex flex-col justify-center items-center mt-10'>
        {" "}
        <p className='text-green-500'>Payment is successful!</p>
        {id === "self" ? (
          <Link href='/'>
            We have sent your self learning roadmap to your email.
          </Link>
        ) : (
          <Link href='/schedule'>Choose time</Link>
        )}
      </div>
    </Layout>
  );
};

export default PaymentSuccessful;
