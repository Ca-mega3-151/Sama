import { Pie } from '@ant-design/charts';

const PaymentGateway = () => {
  const data = [
    { type: 'Cash', value: 40, color: '#A5E7B6' },
    { type: 'Visa', value: 30, color: '#CBC4FF' },
    { type: 'Orange Money', value: 20, color: '#FFA6A6' },
    { type: 'Moov Money', value: 10, color: '#CECEFF' },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    innerRadius: 0.7,
    color: ['#A5E7B6', '#CBC4FF', '#FFA6A6', '#CECEFF'],
    label: false,
    statistic: {
      title: {
        customHtml: () => 'Total',
      },
      content: {
        customHtml: () => '<div style="font-size: 24px; font-weight: bold;">$1.3M</div>',
      },
    },
  };

  return (
    <div className=" mt-5 rounded-lg bg-white p-4 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Payment gateway</h2>
        <select className="rounded border px-2 py-1 text-sm text-gray-600">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      <div className="flex items-center">
        <div className="hidden w-1/2">
          <Pie {...config} />
        </div>
        <div className="space-y-2 ml-4 w-1/2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2 size-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-sm">{item.type}</span>
              </div>
              <span className="text-sm font-medium">{item.value} %</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { PaymentGateway };
