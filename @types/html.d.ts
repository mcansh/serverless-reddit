declare namespace JSX {
  interface Img
    extends React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    > {
    importance?: 'auto' | 'low' | 'high';
  }

  interface IntrinsicElements {
    img: Img;
  }
}
