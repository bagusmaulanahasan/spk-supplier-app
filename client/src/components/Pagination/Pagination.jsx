import React, { useState } from "react";

// Komponen Pagination terpisah
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // Membuat array halaman berdasarkan totalPages
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div style={{ marginTop: "20px" }}>
            <butto
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </butto>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    style={{
                        fontWeight: currentPage === page ? "bold" : "normal",
                        margin: "0 5px",
                    }}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;