import useWindowSize from '@/utils/useWindowSize';
import { useScroll } from '@react-three/drei';
import classnames from 'classnames';

interface ButtonProps {
  type: 'first' | 'second' | 'third';
  active: boolean;
}

const content = {
  first: '1',
  second: '2',
  third: '3',
};

export default function Button({ type, active }: ButtonProps) {
  const scroll = useScroll();
  const width = useWindowSize();

  const handleScroll = () => {
    if (!width) return;
    if (width >= 768) {
      const height = scroll.el.scrollHeight;
      const padding = height / 3 / 3;
      if (type === 'first') scroll.el.scrollTo(0, 0);
      else if (type === 'second') scroll.el.scrollTo(0, height * 0.4);
      else if (type === 'third') scroll.el.scrollTo(0, height);
    } else {
      const scrollWidth = scroll.el.scrollWidth;
      if (type === 'first') scroll.el.scrollTo(0, 0);
      else if (type === 'second') scroll.el.scrollTo(scrollWidth * 0.37, 0);
      else if (type === 'third') scroll.el.scrollTo(scrollWidth, 0);
    }
  };

  return (
    <button
      onClick={handleScroll}
      className={classnames(
        `w-12 h-12 rounded-full border border-black flex justify-center items-center font-semibold text-2xl`,
        {
          'bg-black text-[#FFDB5F]': active,
          'bg-transparent text-black hover:bg-black hover:text-[#FFDB5F]':
            !active,
          "relative after:content-[''] after:w-10 after:bg-black after:h-[1px] after:absolute after:left-[47px]":
            type !== 'third',
        }
      )}
    >
      {content[type]}
    </button>
  );
}
