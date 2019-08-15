declare namespace JSX {
  interface AmpImg
    extends React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    > {
    fallback?: boolean;
    layout?:
      | 'fill'
      | 'fixed'
      | 'fixed-height'
      | 'flex-item'
      | 'intrinsic'
      | 'nodisplay'
      | 'responsive';
  }

  interface IntrinsicElements {
    'amp-img': AmpImg;
  }
}
