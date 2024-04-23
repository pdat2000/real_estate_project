import usePagination from '~/hooks/usePagination'
import PaginationItem from './PaginationItem'
import { Button } from '..'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import withRouter from '~/hocs/withRouter'

const Pagination = ({
  total,
  limit,
  page,
  sibling = 0,
  navigate,
  location,
}) => {
  const paginations = usePagination({
    total,
    limit,
    currentPage: page,
    sibling,
  })
  const [searchParams] = useSearchParams()

  const handleNextPage = () => {
    if (page >= Math.ceil(total / limit)) return
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ page: page + 1 }).toString(),
    })
  }
  const handleBackPage = () => {
    if (page <= 1 || !page) return
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ page: page - 1 }).toString(),
    })
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <Button className="bg-main-500" handleOnClick={handleBackPage}>
        <MdArrowBackIos />
      </Button>
      {paginations?.map((el, idx) => (
        <PaginationItem
          key={idx}
          content={el}
          page={searchParams.get('page')}
        />
      ))}
      <Button className="bg-main-500" handleOnClick={handleNextPage}>
        <MdArrowForwardIos />
      </Button>
    </div>
  )
}

export default withRouter(Pagination)
