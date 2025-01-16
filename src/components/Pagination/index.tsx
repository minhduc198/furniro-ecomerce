import { useMemo } from 'react'
import { DOTS } from '../../constants'

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

interface Props {
  siblingCount: number
  currentPage: number
  totalPages: number
  goToPage: (page: number | string) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
}

export default function Pagination({
  siblingCount,
  currentPage,
  totalPages,
  goToNextPage,
  goToPreviousPage,
  goToPage
}: Props) {
  const pagination = useMemo(() => {
    const firstPage = 1
    const lastPage = totalPages
    const totalPageToShow = siblingCount + 5

    if (totalPages <= totalPageToShow) {
      return range(firstPage, totalPages)
    }

    const leftSiblingIndex = Math.max(1, currentPage - siblingCount)
    const rightSiblingIndex = Math.min(totalPages, currentPage + siblingCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < lastPage - 2

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItem = 3 + 2 * siblingCount
      const leftRange = range(1, leftItem)

      return [...leftRange, DOTS, lastPage]
    }

    if (!shouldShowRightDots && shouldShowLeftDots) {
      const rightItem = 3 + 2 * siblingCount
      const rightRange = range(lastPage - rightItem + 1, lastPage)

      return [firstPage, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPage, DOTS, ...middleRange, DOTS, lastPage]
    }
  }, [siblingCount, currentPage, totalPages])

  return (
    <div className='pagination-container'>
      <button className='btn-prev' disabled={currentPage <= 1} onClick={goToPreviousPage}>
        Previous
      </button>
      {pagination?.map((page, idx) => {
        return (
          <div
            key={idx}
            className={`pagination-page ${currentPage === page ? 'pagination-page-active' : ''}`}
            onClick={() => goToPage(page)}
          >
            {page}
          </div>
        )
      })}
      <button className='btn-next' disabled={currentPage >= totalPages} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}
