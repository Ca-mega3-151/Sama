import { useTranslation } from 'react-i18next';
import { BoxFields } from '~/components/BoxFields';

import { LineChart } from '~/shared/ReactJS';

export const Chart = () => {
  const { t } = useTranslation(['dashboard']);
  return (
    <div className="  w-full">
      <BoxFields className=" " title={t('dashboard:revenue')}>
        <LineChart
          labels={['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']}
          datasets={[
            {
              rawData: undefined,
              key: 'Product 1',
              points: {
                Sep: { data: 23, key: '1', rawData: undefined },
                Oct: { data: 11, key: '2', rawData: undefined },
                Nov: { data: 22, key: '3', rawData: undefined },
                Dec: { data: 27, key: '4', rawData: undefined },
                Jan: { data: 13, key: '5', rawData: undefined },
                Feb: { data: 22, key: '6', rawData: undefined },
                Mar: { data: 37, key: '7', rawData: undefined },
                Apr: { data: 21, key: '8', rawData: undefined },
                May: { data: 44, key: '9', rawData: undefined },
                Jun: { data: 22, key: '10', rawData: undefined },
                Jul: { data: 30, key: '11', rawData: undefined },
                Aug: { data: 45, key: '12', rawData: undefined },
              },
              style: {
                lineColor: 'rgba(1, 99, 170, 4)',
                areaColor: {
                  0: 'rgba(1, 99, 140, 4)',
                  100: 'rgba(45, 99, 227, 0.25)',
                },
              },
            },
          ]}
        />
      </BoxFields>
    </div>
  );
};
