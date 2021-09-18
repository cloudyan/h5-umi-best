export function getList({ pageNum, pageSize = 10, totalPage }) {
  return new Promise((resolve, reject) => {
    const list = Array(pageSize)
      .fill(null)
      .map((item, index) => {
        return {
          id: index + 1,
          name: `name: ${pageNum}-${index + 1}`,
        };
      });
    setTimeout(() => {
      resolve({
        page: {
          pageNum,
          pageSize,
          totalPage,
        },
        list,
      });
    }, 2000);
  });
}
