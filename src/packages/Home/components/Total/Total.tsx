import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const cardData = [
  {
    value: '$12.3M',
    label: 'Income',
    change: '11.2%',
    direction: 'up',
  },
  {
    value: '12.3K',
    label: 'Orders',
    change: '11.2%',
    direction: 'down',
    highlight: true,
  },
  {
    value: '112.3K',
    label: 'Customers',
    change: '11.2%',
    direction: 'up',
  },
  {
    value: '$12.3M',
    label: 'Expense',
    change: '11.2%',
    direction: 'down',
  },
];

const StatsCard = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`rounded-lg bg-white p-4 text-center shadow-md ${
            card.highlight ? 'border-2 border-purple-500' : ''
          }`}
        >
          <div className="text-2xl font-bold">{card.value}</div>
          <div className="text-gray-500">{card.label}</div>
          <div
            className={`mt-2 flex items-center justify-center text-sm ${
              card.direction === 'up' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {card.direction === 'up' ? <ArrowUpOutlined className="mr-1" /> : <ArrowDownOutlined className="mr-1" />}
            <span>{card.change} vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
