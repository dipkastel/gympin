import Link from "next/link";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
  basePath?: string;
}

export default function BlogPagination({
                                         page,
                                         totalPages,
                                         basePath = "/blog",
                                       }: BlogPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageHref = (
          currentPage: number,
      ): string => {
    return currentPage === 0
        ? basePath
        : `${basePath}?page=${
            currentPage + 1
        }`;
  };

  const pages = Array.from(
      { length: totalPages },
      (_, index) => index,
  );

  return (
      <nav
          className="blog-pagination"
          aria-label="صفحه‌بندی مطالب"
      >
        {page > 0 ? (
            <Link
                href={pageHref(
                    page - 1,
                )}
            >
              قبلی
            </Link>
        ) : (
            <span className="disabled">
          قبلی
        </span>
        )}

        {pages.map(
            (currentPage) => (
                <Link
                    key={currentPage}
                    href={pageHref(
                        currentPage,
                    )}
                    className={
                      currentPage === page
                          ? "current"
                          : ""
                    }
                >
                  {currentPage + 1}
                </Link>
            ),
        )}

        {page <
        totalPages - 1 ? (
            <Link
                href={pageHref(
                    page + 1,
                )}
            >
              بعدی
            </Link>
        ) : (
            <span className="disabled">
          بعدی
        </span>
        )}
      </nav>
  );
}
