import React from 'react';
import { Placement } from '@/types/database';

interface PlacementsTableProps {
  collegeName: string;
  placements: Placement[];
}

const PlacementsTable: React.FC<PlacementsTableProps> = ({ collegeName, placements }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">{collegeName} Placements</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-4 py-3 text-left">Metric</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {placements.map((placement, index) => (
              <React.Fragment key={index}>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Placement Year</td>
                  <td className="border border-gray-300 px-4 py-3">{placement.year}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Total Students Placed</td>
                  <td className="border border-gray-300 px-4 py-3">{placement.total_placed}</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Engineering Students Placed</td>
                  <td className="border border-gray-300 px-4 py-3">{placement.engineering_students_placed}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Management Students Placed</td>
                  <td className="border border-gray-300 px-4 py-3">{placement.management_students_placed}</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Median CTC (Engineering)</td>
                  <td className="border border-gray-300 px-4 py-3">{placement.median_ctc_engineering}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-4 py-3 font-semibold">Median CTC (Management)</td>
                  <td className="border border-gray-300 px-4 py-3">{placement.median_ctc_management}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlacementsTable;
