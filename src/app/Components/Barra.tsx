import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface StatsBarProps {
  totalSize: number;
  usedSize: number;
  reservedForHardware: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ totalSize, usedSize, reservedForHardware }) => {
  const totalUsedPercentage = ((usedSize + reservedForHardware) / totalSize) * 100;
  const reservedPercentage = (reservedForHardware / totalSize) * 100;
  const availablePercentage = 100 - totalUsedPercentage;

  return (
    <div className="pt-8 mx-12 mb-10 ">
      <div className="progress">
        <div
          className="progress-bar bg-primary"
          role="progressbar"
          style={{ width: `${reservedPercentage}%` }}
          aria-valuenow={reservedPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
        {usedSize > 0 && (
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: `${totalUsedPercentage}%` }}
            aria-valuenow={totalUsedPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          ></div>
        )}
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${availablePercentage}%` }}
          aria-valuenow={availablePercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      <div className="d-flex justify-center mt-6">
        <div className="mx-3 d-flex atext-center align-items-center">
          <div className="rounded-circle bg-primary mr-2" style={{ width: '10px', height: '10px' }}></div>
          <span className='text-white'>Reservada para Hardware</span>
        </div>
        {usedSize > 0 && (
          <div className="mx-3 d-flex atext-center align-items-center">
            <div className="rounded-circle bg-warning mr-2" style={{ width: '10px', height: '10px' }}></div>
            <span className='text-white'>En Uso</span>
          </div>
        )}
        <div className="mx-3 d-flex atext-center align-items-center">
          <div className="rounded-circle bg-success mr-2" style={{ width: '10px', height: '10px' }}></div>
          <span className='text-white '>Disponible</span>
        </div>
      </div>
    </div>
  );
};

export default StatsBar;
