import usePagination from '~/hooks/usePagination'
import PaginationItem from './PaginationItem'
import { Button } from '..'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({ total, limit, page, sibling = 0 }) => {
  const paginations = usePagination({
    total,
    limit,
    currentPage: page,
    sibling,
  })
  const [searchParams] = useSearchParams()

  return (
    <div className="flex items-center justify-center gap-2">
      <Button className="bg-main-500">
        <MdArrowBackIos />
      </Button>
      {paginations?.map((el, idx) => (
        <PaginationItem
          key={idx}
          content={el}
          page={searchParams.get('page')}
        />
      ))}
      <Button className="bg-main-500">
        <MdArrowForwardIos />
      </Button>
    </div>
  )
}

export default Pagination
