import type { ImageProps as RemixJsImageProps } from '~/shared/RemixJS/client';

export type ImageProps = RemixJsImageProps;
export const Image = ({
  loaderUrl: _loaderUrl,
  transformOptions: _transformOptions,
  responsives: _responsives,
  dprVariants: _dprVariants,
  onLoadingComplete: _onLoadingComplete,
  placeholder: _placeholder,
  fallback: _fallback,
  ...props
}: ImageProps) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
};
