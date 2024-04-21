import usePagination from '~/hooks/usePagination'

const Pagination = () => {
  const paginations = usePagination({
    total: 33,
    limit: 2,
    currentPage: 5,
    sibling: 0,
  })
  console.log('paginations', paginations)
  return <div>Pagination</div>
}

export default Pagination
