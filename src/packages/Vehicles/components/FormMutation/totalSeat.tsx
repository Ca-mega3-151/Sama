import React from 'react';

interface FareSummaryProps {
  seatClasses: { [seat: string]: string };
  totalSeats: number;
}

const FareSummary: React.FC<FareSummaryProps> = ({ seatClasses, totalSeats }) => {
  const fareTypes = ['VVIP', 'VIP', 'Business', 'Ordinary'];

  // Tính toán số lượng ghế theo từng hạng vé
  const counts = fareTypes.reduce(
    (acc, type) => {
      acc[type] = Object.values(seatClasses).filter(value => value === type).length;
      return acc;
    },
    {} as { [key: string]: number },
  );

  const selectedSeats = Object.keys(seatClasses).filter(seat => seatClasses[seat]).length;

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
