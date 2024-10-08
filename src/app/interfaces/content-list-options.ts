export interface ContentListOptions<T> {
  image: {
    onClick?: (item: T) => void;
    src: (item: T) => string;
    alt: (item: T) => string;
  };
  title: {
    onClick?: (item: T) => void;
    displayWith: (item: T) => string;
  };
  date: {
    onClick?: (item: T) => void;
    displayWith: (item: T) => Date | string;
    format?: ((item: T) => string) | null;
  };
  content: {
    onClick?: (item: T) => void;
    displayWith: (item: T) => string;
  };
  onClick?: (item: T) => void;
}
