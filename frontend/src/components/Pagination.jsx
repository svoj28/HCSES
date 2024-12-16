import React, { useState } from 'react';
import { Button, HStack } from '@chakra-ui/react';

const Pagination = ({ data, itemsPerPage, renderTableData }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {renderTableData(currentData)}
      
      {/* Pagination Controls */}
      <HStack spacing={4} mt={4} justify="center">
        <Button
          isDisabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          Previous
        </Button>
        <HStack>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => paginate(index + 1)}
              variant={currentPage === index + 1 ? "solid" : "outline"}
            >
              {index + 1}
            </Button>
          ))}
        </HStack>
        <Button
          isDisabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          Next
        </Button>
      </HStack>
    </>
  );
};

export default Pagination;
