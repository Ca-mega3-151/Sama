import { Tabs } from 'antd';
import React from 'react';
import { VehiclesFormMutation } from './FormMutation';
import SeatSelection from './Seat';
import type { TabsProps } from 'antd';

const onTabChange = (key: string) => {
  console.log('Selected Tab:', key);
};

const CreateTabs: React.FC = () => {
  const formRef = React.useRef(null);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Form Tab',
      children: (
        <VehiclesFormMutation
          ref={formRef}
          uid="vehicles-form"
          isSubmiting={false}
          defaultValues={{
            vehicleBrand: undefined,
            vehicleModel: undefined,
            registrationNumber: undefined,
            manufacturerDate: undefined,
            service: undefined,
            registrationDate: undefined,
            firstcirculationDate: undefined,
            expiryTechnicalVisitDate: undefined,
            insuranceExpiryDate: undefined,
          }}
          onSubmit={values => {
            console.log('Form Submitted', values);
          }}
        />
      ),
    },
    {
      key: '2',
      label: 'Seat Selection',
      children: <SeatSelection />, // Use the SeatSelection component here
    },
  ];

  return (
    <div className="p-4">
      <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} />
    </div>
  );
};

export { CreateTabs };
