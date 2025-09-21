import React from 'react';
import { DatabaseCollege } from '@/types/database'; // Assuming Facility is part of DatabaseCollege

interface FacilitiesTableProps {
  collegeName: string;
  facilities: DatabaseCollege['facilities']; // Use the type from DatabaseCollege
}

const FacilitiesTable: React.FC<FacilitiesTableProps> = ({ collegeName, facilities }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">{collegeName} Facilities</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <tbody>
            {facilities.map((facility, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="border border-gray-300 px-4 py-3">{facility}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FacilitiesTable;
