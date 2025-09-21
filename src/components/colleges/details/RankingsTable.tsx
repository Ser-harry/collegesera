import React from 'react';
import { Ranking } from '@/types/database';

interface RankingsTableProps {
  collegeName: string;
  rankings: Ranking[];
}

const RankingsTable: React.FC<RankingsTableProps> = ({ collegeName, rankings }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">{collegeName} Courses Ranking</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-4 py-3 text-left">Agency</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Year</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Rank</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((ranking, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="border border-gray-300 px-4 py-3">{ranking.agency}</td>
                <td className="border border-gray-300 px-4 py-3">{ranking.year}</td>
                <td className="border border-gray-300 px-4 py-3 font-semibold">{ranking.rank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RankingsTable;
