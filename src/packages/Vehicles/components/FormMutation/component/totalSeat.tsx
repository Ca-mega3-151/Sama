import { sum, values } from 'ramda';
import React, { useMemo } from 'react';
import { VehicleFormMutationStateValues } from '../Formmutation';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { FareStatus } from '~/packages/Vehicles/models/Vehicles';

interface FareSummaryProps {
  totalSeats: number;
  form: ReturnType<typeof useRemixForm<VehicleFormMutationStateValues>>;
}
const FareSummary: React.FC<FareSummaryProps> = ({ form, totalSeats }) => {
  const { watch } = form;

  const seats = watch('seatSettings.seats');

  const fareTypes = ['VVIP', 'VIP', 'Business', 'Ordinary'];

  const counts = useMemo(() => {
    const result: Record<(typeof fareTypes)[number], number> = {
      VVIP: 0,
      VIP: 0,
      Business: 0,
      Ordinary: 0,
    };

    (seats ?? []).forEach(seat => {
      if (seat.type === FareStatus.vvip) {
        result['VVIP']++;
      }
      if (seat.type === FareStatus.vip) {
        result['VIP']++;
      }
      if (seat.type === FareStatus.business) {
        result['Business']++;
      }
      if (seat.type === FareStatus.oridinary) {
        result['Ordinary']++;
      }
    });

    return result;
  }, [seats]);
  const selectedSeats = sum(values(counts));

  return (
    <div className=" flex-1 rounded-lg bg-white p-4 shadow-md ">
      <h3 className="mb-4 text-lg font-bold">FARE CLASS</h3>
      <div className="grid grid-cols-2 gap-4">
        {fareTypes.map(type => (
          <div key={type} className="flex items-center">
            <span
              className={`mr-2 size-4  ${
                {
                  VVIP: 'bg-yellow-200',
                  VIP: 'bg-purple-200',
                  Business: 'bg-green-200',
                  Ordinary: 'bg-orange-200',
                }[type]
              }`}
            ></span>
            <span className="text-sm font-medium">
              {type}: {counts[type]}
            </span>
          </div>
        ))}
      </div>
      <div className=" mt-8 flex gap-5 text-sm">
        <p>
          <strong>Total:</strong> {totalSeats}
        </p>
        <p>
          <strong>Selected:</strong> {selectedSeats}
        </p>
        <p>
          <strong>Empty:</strong> {totalSeats - selectedSeats}
        </p>
      </div>
    </div>
  );
};

export default FareSummary;
