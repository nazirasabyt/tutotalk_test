import { useEffect, useState } from "react";
import GrammarRule from "../../../components/Grammar/GrammarRule";
import { useRouter } from "next/router";
import Layout from "../../../components/Shared/Layout";
import { grammar } from "../../../utils/constants";

const Rule = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const { rule } = router.query;

  useEffect(() => {
    const filteredData = grammar.filter((item) => item.id === rule);
    setData(filteredData);
  }, []);

  return (
    <Layout>
      <GrammarRule data={data} />
    </Layout>
  );
};

export default Rule;
