import React from 'react';

const NoRecords = ({ title = "", showTitle = true }) => {
    return (
        <div>
            {showTitle && (
                <h2 className="font-poppins font-bold text-white text-[clamp(1.5rem,3vw,3rem)] mb-4 mt-4 block w-full relative z-[2]">
                    <span className="text-yellow-400 font-bold">&lt;/</span> {title}
                </h2>
            )}
            <div className="flex justify-center items-center shadow-xl min-h-[300px] min-w-[70vw] bg-[#10104d] rounded-lg my-5">
                <div className="text-center text-white">
                    <svg
                        className="w-12 h-12 mx-auto mb-4 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <h2 className="text-2xl font-bold mb-2">NO HAY REGISTROS</h2>
                    <p className="text-gray-400">No se encontraron datos para mostrar.</p>
                </div>
            </div>
        </div>
    );
};

export default NoRecords;

