import { getTags } from '@/actions/tags'
import { useQuery } from '@tanstack/react-query'

const useTags = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['tags'],
    queryFn: getTags,
    staleTime: Infinity
  })
  return { data, isLoading }
}

export default useTags
