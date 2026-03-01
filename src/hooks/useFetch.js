import { useEffect, useState } from "react";

export default function useFetch(url, deps = []) {
  const [state, setState] = useState({ loading: true, data: null, error: null });
  useEffect(() => {
    let mounted = true;
    setState({ loading: true, data: null, error: null });
    fetch(url).then(r => r.json()).then(data => mounted && setState({ loading: false, data, error: null })).catch(err => mounted && setState({ loading: false, data: null, error: err }));
    return () => mounted = false;
  }, deps);
  return state;
}