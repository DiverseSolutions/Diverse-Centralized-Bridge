import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function useChainList(){
  const { data, error } = useSWR('https://chainlist.dsolutions.mn/api/chainlist', fetcher)

  return {
    chainlist: data,
    isChainListLoading: !error && !data,
    isChainListError: error
  }
}
