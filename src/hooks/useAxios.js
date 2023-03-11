import { useEffect, useState } from "react";
import axios from "axios";

const useAxios = (configParams, isLoadOnMount = true) => {
  axios.defaults.baseURL = process.env.REACT_APP_BE_URL + "/api";

  const [res, setRes] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoadOnMount) {
      fetchDataUsingAxios(configParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDataUsingAxios = async () => {
    return axios
      .request(configParams)
      .then((res) => {
        setRes(res.data);
        return res.data;
      })
      .catch((err) => setErr(err))
      .finally(() => setLoading(false));
  };
  return [res, err, loading, fetchDataUsingAxios];
};

export default useAxios;
