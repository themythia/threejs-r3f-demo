import classnames from 'classnames';
import Button from './Button';

interface CardProps {
  type: 'first' | 'second' | 'third';
  visible: boolean;
}

export default function Card({ type, visible }: CardProps) {
  const title = {
    first: 'Your Setup',
    second: 'Memories',
    third: 'Cars',
  };

  return (
    <div
      className={classnames(
        'flex flex-col items-center gap-y-7 w-screen md:w-1/2 relative transition-all duration-500 p-5 md:p-0',
        {
          'md:left-0 md:top-[calc(33vh)]': type === 'first',
          '-translate-x-1/2 md:translate-x-0 md:right-0 md:left-1/2 md:top-[calc(50vh)]':
            type === 'second',
          '-translate-x-full md:translate-x-0 md:right-0 md:left-1/2 md:top-[calc(75vh)]':
            type === 'third',
          'z-50 opacity-100': visible,
          'z-40 opacity-0': !visible,
        }
      )}
    >
      {visible && (
        <div className='flex gap-x-10 w-full md:w-1/2'>
          <Button type='first' active={type === 'first' && visible} />
          <Button type='second' active={type === 'second' && visible} />
          <Button type='third' active={type === 'third' && visible} />
        </div>
      )}
      <h1 className='font-bold text-[44px] md:text-[83px] w-full md:w-1/2'>
        {title[type]}
      </h1>
      <p className='text-lg md:text-2xl w-full md:w-1/2'>
        Create your own custom workspace! Our furnitures, especially created for
        designers and developers.
      </p>
    </div>
  );
}
