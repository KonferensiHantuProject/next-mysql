export const Paginate = (data, currentPage, pageSize) => {

    // Index
    const startIndex = (currentPage - 1)*pageSize;

    return data.slice(startIndex, startIndex + pageSize);
}