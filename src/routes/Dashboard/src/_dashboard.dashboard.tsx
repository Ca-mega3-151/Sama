import { PageErrorBoundary } from '~/components/PageErrorBoundary';
import { Chart } from '~/packages/Home/components/Chart/Chart';
import { PaymentGateway } from '~/packages/Home/components/Payment/Payment';
import StatsCard from '~/packages/Home/components/Total/Total';
import UpcomingDeparture from '~/packages/Home/components/Upcoming/Upcoming';

export const Page = () => {
  return (
    <div>
      <StatsCard />
      <div className="flex">
        <div className="mr-5 max-h-[200px] w-2/3">
          <Chart />
        </div>
        <div className="mb-5 w-1/3">
          <UpcomingDeparture />
          <PaymentGateway />
        </div>
      </div>
    </div>
  );
};

export const ErrorBoundary = PageErrorBoundary;

export default Page;
