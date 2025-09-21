import React from 'react';
import { Course } from '@/types/database';

interface CoursesTableProps {
  collegeName: string;
  courses: Course[];
}

const CoursesTable: React.FC<CoursesTableProps> = ({ collegeName, courses }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">{collegeName} Courses Offered</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-4 py-3 text-left">Course Name</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Course Details</th>
              <th className="border border-gray-300 px-4 py-3 text-left">Selection Basis</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="border border-gray-300 px-4 py-3 font-semibold">{course.name}</td>
                <td className="border border-gray-300 px-4 py-3">
                  Duration: {course.duration}<br />
                  Eligibility: {course.eligibility}
                </td>
                <td className="border border-gray-300 px-4 py-3">{course.selection_basis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTable;
