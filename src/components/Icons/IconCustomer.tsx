import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';

export const IconCustomer: FC<HTMLAttributes<HTMLSpanElement>> = props => {
  return (
    <span {...props} className={classNames('flex items-center justify-center', props.className)}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9.16005 10.8701C9.05028 10.8601 8.93982 10.8601 8.83005 10.8701C7.66626 10.8269 6.56591 10.3286 5.76567 9.48251C4.96542 8.63641 4.5292 7.51004 4.55082 6.34564C4.57243 5.18124 5.05017 4.07184 5.88127 3.25603C6.71237 2.44021 7.83045 1.98315 8.99505 1.98315C10.1596 1.98315 11.2777 2.44021 12.1088 3.25603C12.9399 4.07184 13.4177 5.18124 13.4393 6.34564C13.4609 7.51004 13.0247 8.63641 12.2244 9.48251C11.4242 10.3286 10.3238 10.8269 9.16005 10.8701Z"
          stroke="#777E91"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.41 4C17.3383 4 18.2285 4.36875 18.8849 5.02513C19.5413 5.6815 19.91 6.57174 19.91 7.5C19.9107 8.40617 19.5598 9.27726 18.9313 9.93002C18.3028 10.5828 17.4456 10.9663 16.54 11C16.4537 10.99 16.3664 10.99 16.28 11"
          stroke="#777E91"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.15997 14.561C1.73997 16.181 1.73997 18.821 4.15997 20.431C5.67323 21.3341 7.40268 21.811 9.16497 21.811C10.9273 21.811 12.6567 21.3341 14.17 20.431C16.59 18.811 16.59 16.171 14.17 14.561C12.6551 13.6626 10.9262 13.1885 9.16497 13.1885C7.40369 13.1885 5.67488 13.6626 4.15997 14.561V14.561Z"
          stroke="#777E91"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.3401 20C19.0503 19.8603 19.7201 19.563 20.3001 19.13C20.6587 18.901 20.9539 18.5854 21.1584 18.2123C21.3629 17.8391 21.4701 17.4205 21.4701 16.995C21.4701 16.5695 21.3629 16.1509 21.1584 15.7777C20.9539 15.4046 20.6587 15.089 20.3001 14.86C19.7258 14.4384 19.0676 14.1451 18.3701 14"
          stroke="#777E91"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};