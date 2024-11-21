import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';

export const IconClass: FC<HTMLAttributes<HTMLSpanElement>> = props => {
  return (
    <span {...props} className={classNames('flex items-center justify-center', props.className)}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.9949 4H6.99488C3.16488 4 2.09488 4.92 2.00488 8.5C2.93141 8.50265 3.81908 8.87256 4.47329 9.52866C5.12751 10.1847 5.49489 11.0735 5.49488 12C5.49489 12.9265 5.12751 13.8153 4.47329 14.4713C3.81908 15.1274 2.93141 15.4974 2.00488 15.5C2.09488 19.08 3.16488 20 6.99488 20H16.9949C20.9949 20 21.9949 19 21.9949 15V9C21.9949 5 20.9949 4 16.9949 4Z"
          stroke="#777E91"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8.99292 4V7.5" stroke="#777E91" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.99292 16.5V20" stroke="#777E91" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path
          d="M15.025 9.33012L15.645 10.5801C15.6752 10.64 15.7189 10.6919 15.7727 10.7319C15.8266 10.7718 15.889 10.7986 15.955 10.8101L17.335 11.0101C17.4119 11.0213 17.4841 11.0538 17.5434 11.1039C17.6028 11.154 17.6469 11.2197 17.6708 11.2936C17.6948 11.3675 17.6975 11.4466 17.6788 11.522C17.6601 11.5973 17.6207 11.666 17.565 11.7201L16.565 12.6901C16.5161 12.7372 16.4796 12.7956 16.4587 12.8601C16.4378 12.9246 16.4331 12.9933 16.445 13.0601L16.685 14.4301C16.6984 14.5063 16.6902 14.5848 16.6613 14.6566C16.6324 14.7284 16.5841 14.7907 16.5217 14.8365C16.4592 14.8822 16.3853 14.9096 16.3081 14.9156C16.231 14.9215 16.1537 14.9058 16.085 14.8701L14.855 14.2201C14.7943 14.1905 14.7276 14.1751 14.66 14.1751C14.5924 14.1751 14.5257 14.1905 14.465 14.2201L13.235 14.8701C13.1664 14.9066 13.0889 14.923 13.0114 14.9174C12.9339 14.9118 12.8595 14.8845 12.7968 14.8385C12.7342 14.7926 12.6857 14.7299 12.6571 14.6576C12.6285 14.5854 12.6208 14.5065 12.635 14.4301L12.875 13.0601C12.8861 12.9933 12.8811 12.9249 12.8602 12.8605C12.8393 12.7961 12.8032 12.7376 12.755 12.6901L11.765 11.7201C11.7093 11.666 11.6699 11.5973 11.6512 11.522C11.6325 11.4466 11.6352 11.3675 11.6592 11.2936C11.6831 11.2197 11.7272 11.154 11.7866 11.1039C11.8459 11.0538 11.9181 11.0213 11.995 11.0101L13.375 10.8101C13.4422 10.8019 13.506 10.7764 13.5604 10.736C13.6147 10.6957 13.6576 10.642 13.685 10.5801L14.295 9.33012C14.3266 9.25972 14.3778 9.19994 14.4426 9.158C14.5073 9.11606 14.5828 9.09375 14.66 9.09375C14.7372 9.09375 14.8127 9.11606 14.8774 9.158C14.9422 9.19994 14.9934 9.25972 15.025 9.33012V9.33012Z"
          stroke="#777E91"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
};