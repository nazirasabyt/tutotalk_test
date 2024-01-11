import React from "react";
import ProfilePage from "@/components/Profile/Profile";
import Layout from "@/components/Shared/Layout";
import { useIntl } from "react-intl";

const Account = () => {
  const intl = useIntl();
  const text = intl.formatMessage({ id: "soon" });
  return (
    <Layout className='flex justify-between w-0'>
      <ProfilePage />
    </Layout>
  );
};
export default Account;
