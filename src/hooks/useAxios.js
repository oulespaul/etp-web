import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (configParams) => {
  axios.defaults.baseURL = process.env.REACT_APP_BE_URL + "/api";

  const [res, setRes] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDataUsingAxios(configParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDataUsingAxios = async () => {
    await axios
      .request(configParams)
      .then((res) => setRes(res.data))
      .catch((err) => setErr(err))
      .finally(() => setLoading(false));
  };
  return [res, err, loading, fetchDataUsingAxios];
};

export default useAxios;
