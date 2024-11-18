import { BellOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { isEmpty, range } from 'ramda';
import { FC, UIEventHandler, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { io, Socket } from 'socket.io-client';
import { v4 } from 'uuid';
import { SessionData } from '~/packages/_Common/Auth/models/SessionData';
import { Badge, Button, Dropdown, DropdownItem, Empty, Loading, notification } from '~/shared/ReactJS';
import { humanizeTimeago, isBrowser } from '~/shared/Utilities';

enum NotificationEvent {
  CREATE_SOMETHING = 'CREATE_SOMETHING',
}
interface NotificationItem {
  _id: string;
  content: string;
  createdAt: number;
  isRead: boolean;
  event: NotificationEvent;
}
interface Props {
  sessionData: SessionData;
}
export const Notification: FC<Props> = ({ sessionData }) => {
  const { t } = useTranslation(['dashboard_layout', 'common']);

  //#region Listing
  const [listingDataState, setListingDataState] = useState<{
    items: NotificationItem[];
    page: number;
    isLoading: boolean;
    isLoadingMore: boolean;
    unreadCount: number;
    totalRecords: number;
  }>({ isLoading: false, isLoadingMore: false, items: [], page: 1, unreadCount: 0, totalRecords: 0 });
  const isLoadmorable = useMemo(() => {
    return listingDataState.items.length < listingDataState.totalRecords;
  }, [listingDataState]);

  const handleGetListingData = async () => {
    setListingDataState(state => ({ ...state, isLoading: true }));
    try {
      // const getNotificationsResponse = await getNotifications({ page: 1 });
      const getNotificationsResponse = {
        unreadCount: 200,
        total: 200,
        items: range(0, 50).map(() => ({
          _id: v4(),
          isRead: false,
          createdAt: Date.now(),
          content: 'Welcome to ReactJS CRUD boilerplate with Restful API',
          event: NotificationEvent.CREATE_SOMETHING,
        })),
      };
      setListingDataState(state => ({
        ...state,
        unreadCount: getNotificationsResponse.unreadCount,
        isLoading: false,
        isLoadingMore: false,
        totalRecords: getNotificationsResponse.total,
        items: getNotificationsResponse.items,
      }));
    } catch {
      setListingDataState(state => ({
        ...state,
        isLoading: false,
      }));
    }
  };

  const handleLoadmore = async () => {
    if (!listingDataState.isLoadingMore && isLoadmorable) {
      setListingDataState(state => ({ ...state, isLoadingMore: true }));
      const nextPage = listingDataState.page + 1;
      try {
        // const getNotificationsResponse = await getNotifications({ page: nextPage });
        const getNotificationsResponse = {
          items: range(0, 10).map(() => ({
            _id: v4(),
            isRead: false,
            createdAt: Date.now(),
            content: 'Welcome to ReactJS CRUD boilerplate with Restful API',
            event: NotificationEvent.CREATE_SOMETHING,
          })),
        };

        setListingDataState(state => ({
          ...state,
          items: state.items.concat(getNotificationsResponse.items),
          isLoadingMore: false,
          page: nextPage,
        }));
      } catch (error) {
        setListingDataState(state => ({
          ...state,
          isLoadingMore: false,
        }));
      }
    }
  };

  const handleScroll: UIEventHandler<HTMLDivElement> = event => {
    const scrollableDiv = event.currentTarget as HTMLDivElement;
    const scrollPosition = scrollableDiv.scrollTop + scrollableDiv.clientHeight;
    const scrollHeight = scrollableDiv.scrollHeight;
    if (scrollHeight - scrollPosition <= 100) {
      handleLoadmore();
    }
  };

  useEffect(() => {
    handleGetListingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //#endregion

  //#region Mark all as read
  const [markAllAsReadLoading, setMarkAllAsReadLoading] = useState(false);

  const handleMarkAllAsRead = async () => {
    setMarkAllAsReadLoading(true);
    try {
      // await markAllAsRead({});
      console.log('markAllAsRead API');
      setListingDataState(state => ({
        ...state,
        unreadCount: 0,
        items: state.items.map(item => ({
          ...item,
          isRead: true,
        })),
      }));
    } finally {
      setMarkAllAsReadLoading(false);
    }
  };
  //#endregion

  //#region Mark as read
  const handleMarkAsRead = (notification: NotificationItem) => {
    setListingDataState(state => ({
      ...state,
      unreadCount: state.unreadCount - (notification.isRead ? 0 : 1),
      items: state.items.map(item => {
        if (item._id === notification._id) {
          return { ...item, isRead: true };
        }
        return item;
      }),
    }));
    // markAsRead({ _id: notification._id });
    console.log('markAsRead API');
    console.log('Do something else');
  };
  //#endregion

  //#region Socket
  const connectionRef = useRef<Socket | null>(null);

  const handleOffTopics = () => {
    Object.values(NotificationEvent).forEach(topic => {
      connectionRef.current?.off(topic);
    });
  };

  useEffect(() => {
    if (isBrowser() && sessionData?.accessToken) {
      connectionRef.current = io('SOCKET_API', {
        forceNew: true,
        reconnection: true,
        autoConnect: true,
      });

      connectionRef.current?.on('connect', () => {
        console.log('Connected');
        connectionRef.current?.emit('identify', sessionData?.accessToken);
      });
      connectionRef.current?.on('disconnect', () => {
        console.log('Disconnected');
        handleOffTopics();
      });

      Object.values(NotificationEvent).forEach(topic => {
        connectionRef.current?.on(topic, (data: NotificationItem) => {
          setListingDataState(state => ({
            ...state,
            unreadCount: state.unreadCount + 1,
            totalRecords: state.totalRecords + 1,
            items: [data, ...state.items],
          }));
          notification.info({
            message: t('dashboard_layout:have_new_notification'),
            description: data.content,
          });
        });
      });
    }
    return () => {
      connectionRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionData]);
  //#endregion

  const dropdownItems: DropdownItem[] = useMemo(() => {
    if (listingDataState.isLoading) {
      return [
        {
          key: '1',
          disabled: true,
          className: '!cursor-default w-[420px] max-w-screen',
          label: (
            <div className="flex items-center justify-center py-6">
              <Loading />
            </div>
          ),
        },
      ];
    }

    if (isEmpty(listingDataState.items)) {
      return [
        {
          key: '1',
          disabled: true,
          className: '!cursor-default w-[420px] max-w-screen',
          label: (
            <div className="grid grid-cols-1 py-3 text-center">
              <Empty />
              <div>{t('common:no_data')}</div>
            </div>
          ),
        },
      ];
    }

    return listingDataState.items
      .map<DropdownItem>(item => ({
        key: item._id,
        className: 'w-[420px] max-w-screen !cursor-pointer',
        onClick: () => handleMarkAsRead(item),
        label: (
          <div className="flex justify-between gap-4">
            <div className="grid flex-1 grid-cols-1">
              <div className="whitespace-normal font-medium">{item.content}</div>
              <div className="text-xs">{humanizeTimeago({ date: item.createdAt })}</div>
            </div>
            <div className="w-2 shrink-0 grow-0 basis-2 pt-1.5">
              <div className={classNames('bg-yy-info h-2 w-2 rounded-full', item.isRead ? 'hidden' : '')} />
            </div>
          </div>
        ),
      }))
      .concat({
        key: 'loadmore',
        disabled: true,
        hidden: !isLoadmorable,
        className: '!cursor-default w-[420px] max-w-screen',
        label: (
          <div className="flex items-center justify-center py-6">
            <Loading />
          </div>
        ),
      });
  }, [listingDataState, isLoadmorable, t]);

  return (
    <Dropdown
      arrow={{ pointAtCenter: true }}
      footer={
        <div className="flex justify-center">
          <Button loading={markAllAsReadLoading} onClick={handleMarkAllAsRead} type="link">
            {t('dashboard_layout:mark_all_as_read')}
          </Button>
        </div>
      }
      menuMaxHeight="calc(100dvh - 160px)"
      onMenuScroll={handleScroll}
      items={dropdownItems}
    >
      <div className="flex size-6 cursor-pointer items-center justify-center">
        <Badge content={listingDataState.unreadCount}>
          <BellOutlined className="text-xl" />
        </Badge>
      </div>
    </Dropdown>
  );
};
