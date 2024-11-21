import { CalendarOutlined, ArrowRightOutlined, ClockCircleOutlined } from '@ant-design/icons';

const UpcomingDeparture = () => {
  const departures = [
    {
      time: '07:30',
      location: 'Toulouse, France',
      duration: '5h40',
      stops: '6 stops',
      bus: 'EURABUS V2.0',
      busNumber: 'RGN0430203',
      seats: '4/41',
      ticketNumber: '#RT-1234',
      image:
        'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/avatar-dep-5.jpg.webp',
    },
    {
      time: '08:30',
      location: 'Toulouse, France',
      duration: '5h40',
      stops: '6 stops',
      bus: 'EURABUS V2.0',
      busNumber: 'RGN0430203',
      seats: '4/41',
      ticketNumber: '#RT-1234',
      image:
        'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/avatar-dep-5.jpg.webp',
    },
    {
      time: '09:15',
      location: 'Toulouse, France',
      duration: '5h40',
      stops: '6 stops',
      bus: 'EURABUS V2.0',
      busNumber: 'RGN0430203',
      seats: '4/41',
      ticketNumber: '#RT-1234',
      image:
        'https://hoanghamobile.com/tin-tuc/wp-content/webp-express/webp-images/uploads/2023/07/avatar-dep-5.jpg.webp',
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Upcoming departure</h2>
        <ArrowRightOutlined className="text-gray-500" />
      </div>
      <div className="mb-4 flex items-center text-sm text-gray-500">
        <CalendarOutlined className="mr-2" />
        Friday, 04/01/2023
      </div>
      <div className="space-y-4">
        {departures.map((departure, index) => (
          <div key={index} className="flex items-start rounded-lg border border-gray-200 bg-gray-50 p-4">
            <img src={departure.image} alt={departure.bus} className="mr-4 h-16 w-20 rounded-lg object-cover" />
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-lg font-semibold">{departure.time}</span>
                <span className="text-sm text-gray-500">{departure.ticketNumber}</span>
              </div>
              <div className="text-sm text-gray-500">{departure.location}</div>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center text-sm text-blue-500">
                  <ClockCircleOutlined className="mr-1" />
                  {departure.duration}
                </div>
                <div className="rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-500">{departure.stops}</div>
              </div>
            </div>
            <div className="ml-4 text-right">
              <div className="text-sm font-semibold">{departure.bus}</div>
              <div className="text-sm text-gray-500">{departure.busNumber}</div>
              <div className="mt-2 text-sm text-gray-700">
                Seats <span className="font-semibold">{departure.seats}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDeparture;
