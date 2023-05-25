import React, { useState, useEffect } from "react";
const items = [...Array(33).keys()];

function Items({ currentItems }) {
  return (
    <div className="items">
      {currentItems && currentItems.map((item, i) => <div key={i}></div>)}
    </div>
  );
}

function PaginatedItems({ itemsPerPage }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // Add state to keep track of the current page and whether the pagination buttons
  // should be updated.
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldUpdatePagination, setShouldUpdatePagination] = useState(false);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));

   
    if (currentPage == 6) {
      setShouldUpdatePagination(true);
    }
    if (currentPage == 5) {
      setShouldUpdatePagination(false);
    }

    // If the user is on the 5th page, set a flag to update the pagination buttons
    // on the next render.
  }, [itemOffset, itemsPerPage, currentPage]);
 
  // Generate pagination buttons for the first 5 pages.
  const pageButtons = [];
  if (!shouldUpdatePagination) {
    for (let i = 0; i < pageCount && i < 5; i++) {
      pageButtons.push(
        <li
          key={i}
          className={`page-item ${
            itemOffset / itemsPerPage === i ? "active" : ""
          }`}
          style={{ margin: "0.5%" }}
        >
          <button
            className="page-link"
            style={{
              display: "flex",
              height: "40px",
              backgroundColor: currentPage == i + 1 ? "#F47C7C" : "white",
              color: "black",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "16px",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid black",
            }}
            onClick={() => {
              setItemOffset(i * itemsPerPage);
              setCurrentPage(i + 1);
            }}
          >
            <p style={{ margin: "0px" }}> {i + 1}</p>
          </button>
        </li>
      );
    }
  }
  // If the pagination buttons should be updated, generate buttons for the next 5 pages.
  if (shouldUpdatePagination && currentPage > 5) {
   
    for (let i = 5; i < pageCount; i++) {
      pageButtons.push(
        <li
          key={i}
          className={`page-item ${
            itemOffset / itemsPerPage === i ? "active" : ""
          }`}
          style={{ margin: "1%" }}
        >
          <button
            className="page-link"
            style={{
              display: "flex",
              height: "40px",
              backgroundColor: currentPage == i + 1 ? "#F47C7C" : "white",
              color: "black",
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: "16px",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid black",
            }}
            onClick={() => {
              setItemOffset(i * itemsPerPage);
              setCurrentPage(i + 1);
            }}
          >
            <p style={{ margin: "0px" }}> {i + 1}</p>
          </button>
        </li>
      );
    }
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",

        flexWrap: "wrap",
        justifyContent: "center",
        height: "fit-content",
        alignContent: "center",
        alignItems: "center",
      }}
      className="h-auto"
    >
      <Items currentItems={currentItems} />
      <nav
        style={{
          width: "100%",
          display: "flex",

          flexWrap: "wrap",

          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          
        }}
        className="h-auto"
      >
        <ul
          className="pagination"
          style={{
            display: "flex",
            flexWrap: "wrap",
           
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              style={{
                display: "flex",
                height: "40px",
                backgroundColor: currentPage === 1 ? "lightgray" : "white",

                color: "black",
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "16px",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid black",
              }}
              onClick={() => {
                setItemOffset(itemOffset - itemsPerPage);
                setCurrentPage(currentPage - 1);
              }}
            >
              <p
                style={{
                  margin: "0px",
                  marginRight: "10px",
                }}
              >
                {"<<"}
              </p>
              <p style={{ margin: "0px" }}>Previous</p>
            </button>
          </li>
          {pageButtons}
          <li
            className={`page-item ${
              currentPage === pageCount ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              style={{
                backgroundColor:
                  currentPage === pageCount ? "lightgray" : "white",
                display: "flex",
                height: "40px",

                color: "black",
                fontFamily: "Roboto",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: "16px",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid black",
              }}
              onClick={() => {
                setItemOffset(itemOffset + itemsPerPage);
                setCurrentPage(currentPage + 1);
              }}
            >
              <p style={{ margin: "0px" }}>Next</p>
              <p
                style={{
                  margin: "0px",
                  marginLeft: "10px",
                }}
              >
                {">>"}
              </p>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Pagination() {
  return (
    <div
      style={{
        width: "100%",
       
        
        display: "flex",
        flexWrap:"wrap",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <PaginatedItems itemsPerPage={4} />
    </div>
  );
}

export default Pagination;
