import React from 'react';
import { AdmissionProcess } from '@/types/database';

interface AdmissionProcessTableProps {
  collegeName: string;
  collegeLocation: string;
  admissionProcess: AdmissionProcess;
}

const AdmissionProcessTable: React.FC<AdmissionProcessTableProps> = ({ collegeName, collegeLocation, admissionProcess }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">{collegeName} Admission</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-4 py-3 text-left" colSpan={2}>Admission Process</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="border border-gray-300 px-4 py-3 font-semibold">Admission Basis</td>
              <td className="border border-gray-300 px-4 py-3">{admissionProcess.admission_basis}</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="border border-gray-300 px-4 py-3 font-semibold">Online Application</td>
              <td className="border border-gray-300 px-4 py-3">
                <ul className="list-disc list-inside">
                  {admissionProcess.online_application_steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="border border-gray-300 px-4 py-3 font-semibold">Offline Application</td>
              <td className="border border-gray-300 px-4 py-3">
                <ul className="list-disc list-inside">
                  {admissionProcess.offline_application_steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                  <li>Mail the envelope to:
                    <div className="mt-2 p-2 bg-gray-100 rounded">
                      <p className="font-semibold">The Principal,</p>
                      <p>{collegeName},</p>
                      <p>{collegeLocation}</p>
                    </div>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdmissionProcessTable;
