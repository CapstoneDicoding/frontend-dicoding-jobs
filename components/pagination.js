import { useRouter } from "next/router";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Pagination({ navigateEndpoint, totalPages }) {
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;

  const navigateToPage = (page) => {
    router.push(`/${navigateEndpoint}?page=${page}`);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      navigateToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      navigateToPage(currentPage + 1);
    }
  };

  const renderPages = () => {
    const pages = [];
    let startPage = currentPage - 1;
    let endPage = currentPage + 2;

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(startPage + 3, totalPages);
    }
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - 3, 1);
    }

    pages.push(
      <div
        key={1}
        className={`flex justify-center items-center cursor-pointer h-8 w-9 border border-gray-300 ${
          currentPage === 1 ? "bg-mainColor" : ""
        }`}
        onClick={() => navigateToPage(1)}
      >
        <p className={`${currentPage === 1 ? "text-white" : ""}`}>1</p>
      </div>
    );

    if (startPage > 2) {
      pages.push(
        <div key="ellipsis1" className={`flex justify-center items-center cursor-pointer h-8 w-9 border border-gray-300`}>
          <p>...</p>
        </div>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(
          <div
            key={i}
            className={`flex justify-center items-center cursor-pointer h-8 w-9 border border-gray-300 ${
              currentPage === i ? "bg-mainColor" : ""
            }`}
            onClick={() => navigateToPage(i)}
          >
            <p className={`${currentPage === i ? "text-white" : ""}`}>{i}</p>
          </div>
        );
      }
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <div key="ellipsis2" className={`flex justify-center items-center cursor-pointer h-8 w-9 border border-gray-300`}>
          <p>...</p>
        </div>
      );
    }

    if (totalPages > 1) {
      pages.push(
        <div
          key={totalPages}
          className={`flex justify-center items-center cursor-pointer h-8 w-9 border border-gray-300 ${
            currentPage === totalPages ? "bg-mainColor" : ""
          }`}
          onClick={() => navigateToPage(totalPages)}
        >
          <p className={`${currentPage === totalPages ? "text-white" : ""}`}>{totalPages}</p>
        </div>
      );
    }

    return pages;
  };

  return (
    <div className="flex">
      <div
        className={`flex justify-center items-center cursor-pointer h-8 w-9 border border-gray-300`}
        onClick={goToPreviousPage}
      >
        <FaAngleLeft />
      </div>
      {renderPages()}
      <div
        className={`flex justify-center items-center cursor-pointer h-8 w-9 border border-gray-300`}
        onClick={goToNextPage}
      >
        <FaAngleRight />
      </div>
    </div>
  );
}
