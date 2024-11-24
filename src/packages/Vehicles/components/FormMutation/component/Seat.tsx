import { Button, Popover, Radio } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { VehicleFormMutationStateValues } from '../FormMutation';
import FareSummary from './totalSeat';
import { useRemixForm } from '~/overrides/remix-hook-form';
import { FareStatus, Vehicles } from '~/packages/Vehicles/models/Vehicles';

const seatRows = [
  ['1A', '1B', '1C', '1D'],
  ['2A', '2B', '2C', '2D'],
  ['3A', '3B', '3C', '3D'],
  ['4A', '4B', '4C', '4D'],
  ['5A', '5B', '5C', '5D'],
  ['6A', '6B', '6C', '6D'],
  ['7A', '7B', '7C', '7D'],
  ['8A', '8B', '8C', '8D'],
  ['9A', '9B', '9C', '9D'],
  ['10A', '10B', '10C', '10D'],
  ['11A', '11B', '11C', '11D'],
  ['12A', '12B', '12C', '12D'],
  ['13A', '13B', '13C', '13D'],
  ['14A', '14B', '14C', '14D'],
  ['15A', '15B', '15C', '15D'],
  ['16A', '16B', '16C', '16D'],
  ['17A', '17B', '17C', '17D'],
  ['18A', '18B', '18C', '18D'],
];

interface Props {
  form: ReturnType<typeof useRemixForm<VehicleFormMutationStateValues>>;
  disabledField: boolean;
  isEdit: boolean;
  vehicles: Vehicles | undefined;
}

const SeatSelection: React.FC<Props> = ({ form }) => {
  const { setValue, watch } = form;

  const seats = watch('seatSettings.seats');

  // Sử dụng enum FareStatus
  const fareTypes = Object.values(FareStatus);

  const totalSeats = 73;

  // Mapping fare classes to colors
  const seatColorMap: { [key in FareStatus]: string } = {
    [FareStatus.vvip]: 'bg-yellow-200',
    [FareStatus.vip]: 'bg-purple-200',
    [FareStatus.business]: 'bg-green-200',
    [FareStatus.oridinary]: 'bg-orange-200',
  };

  const handleClassChange = (seatId: string, fareStatus: FareStatus | 'CLEAR', isSelected: boolean) => {
    if (fareStatus === 'CLEAR') {
      // Xóa ghế khỏi danh sách
      setValue(
        'seatSettings.seats',
        (seats ?? []).filter(seatItem => seatItem._id !== seatId),
      );
      return;
    }
    if (isSelected) {
      // Cập nhật loại ghế
      setValue(
        'seatSettings.seats',
        (seats ?? []).map(seatItem => {
          if (seatItem._id === seatId) {
            return {
              ...seatItem,
              type: fareStatus,
            };
          }
          return seatItem;
        }),
      );
      return;
    }
    // Thêm ghế mới vào danh sách
    setValue('seatSettings.seats', (seats ?? []).concat({ _id: seatId, type: fareStatus }));
  };

  const renderSeat = (seatId: string) => {
    const _seatValue = seats?.find(seatItem => seatItem._id === seatId);

    const content = (
      <div className="p-2">
        <div className="mb-2 flex justify-between">
          <h4 className="text-sm font-medium">Fare Class</h4>
          <Button type="link" size="small" danger onClick={() => handleClassChange(seatId, 'CLEAR', !!_seatValue)}>
            Clear
          </Button>
        </div>
        <Radio.Group
          onChange={e => handleClassChange(seatId, e.target.value as FareStatus, !!_seatValue)}
          value={_seatValue?.type}
        >
          {fareTypes.map(option => (
            <Radio key={option} value={option}>
              {option}
            </Radio>
          ))}
        </Radio.Group>
      </div>
    );

    // Xác định class màu dựa trên loại ghế
    const seatClass = _seatValue?.type ? seatColorMap[_seatValue.type as FareStatus] : '';

    return (
      <Popover content={content} title={seatId} trigger="click" key={seatId}>
        <div
          className={classNames(
            'flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border text-sm font-medium',
            seatClass,
          )}
        >
          {seatId}
        </div>
      </Popover>
    );
  };

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1 p-4">
        <h2 className="mb-4 text-lg font-medium">Seat Setting</h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-4 gap-2">{seatRows.map(row => row.map(seat => renderSeat(seat)))}</div>
        </div>
      </div>
      <div className="w-1/2">
        <FareSummary totalSeats={totalSeats} form={form} />
      </div>
    </div>
  );
};

export { SeatSelection };
