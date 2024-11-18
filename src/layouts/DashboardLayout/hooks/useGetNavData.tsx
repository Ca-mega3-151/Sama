import { HomeOutlined, StarOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from '~/overrides/remix';
import { BrandingFullFeaturesBaseUrl } from '~/routes/Dashboard/src/BrandingFullFeaturesRoutes/src/constants/BaseUrl';
import { BrandingStandardWithModalBaseUrl } from '~/routes/Dashboard/src/BrandingStandardWithModal/src/constants/BaseUrl';
import { BrandingStandardWithPageBaseUrl } from '~/routes/Dashboard/src/BrandingStandardWithPage/src/constants/BaseUrl';
import { BrandingWithDeferBaseUrl } from '~/routes/Dashboard/src/BrandingWithDeferRoutes/src/constants/BaseUrl';
import { ClassesWithModalBaseUrl } from '~/routes/Dashboard/src/Classes/src/constants/BaseUrl';
import { MenuVerticalProps } from '~/shared/ReactJS';

export const useGetNavData = () => {
  const { t } = useTranslation(['dashboard_layout']);
  const navigate = useNavigate();
  const location = useLocation();

  const items: MenuVerticalProps<string>['items'] = useMemo(() => {
    return [
      {
        key: '/dashboard',
        icon: <HomeOutlined />,
        label: t('dashboard_layout:home'),
        onClick: () => navigate('/dashboard'),
      },
      {
        key: BrandingFullFeaturesBaseUrl,
        icon: <StarOutlined />,
        label: t('dashboard_layout:branding_full_features'),
        onClick: () => navigate(BrandingFullFeaturesBaseUrl),
      },
      {
        key: BrandingWithDeferBaseUrl,
        icon: <StarOutlined />,
        label: t('dashboard_layout:branding_defer'),
        onClick: () => navigate(BrandingWithDeferBaseUrl),
      },
      {
        key: BrandingStandardWithModalBaseUrl,
        icon: <StarOutlined />,
        label: t('dashboard_layout:branding_standard_with_modal'),
        onClick: () => navigate(BrandingStandardWithModalBaseUrl),
      },
      {
        key: BrandingStandardWithPageBaseUrl,
        icon: <StarOutlined />,
        label: t('dashboard_layout:branding_standard_with_page'),
        onClick: () => navigate(BrandingStandardWithPageBaseUrl),
      },
      {
        key: ClassesWithModalBaseUrl,
        icon: <StarOutlined />,
        label: t('dashboard_layout:classes'),
        onClick: () => navigate(ClassesWithModalBaseUrl),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  useEffect(() => {
    const currentActiveKey = location.pathname;
    const parentMenuItem = items.find(item => {
      return (
        item &&
        'children' in item &&
        item.children?.some(child => 'key' in child && child.key && currentActiveKey.startsWith(child.key.toString()))
      );
    });
    setOpenKeys(parentMenuItem?.key ? [parentMenuItem.key.toString()] : []);
  }, [items, location]);

  const selectedKey = useMemo(() => {
    const secondSlashIndex = location.pathname.indexOf('/', 1);
    if (secondSlashIndex !== -1) {
      return location.pathname.substring(0, secondSlashIndex);
    } else {
      return location.pathname;
    }
  }, [location]);

  return { items, openKeys, setOpenKeys, selectedKey };
};
