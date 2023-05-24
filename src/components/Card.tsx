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
        'flex flex-col items-center gap-y-7 w-1/2 relative transition-all duration-500 z-50',
        {
          'left-0 top-[calc(33vh)]': type === 'first',
          'right-0 left-1/2 top-[calc(50vh)]': type === 'second',
          'right-0 left-1/2 top-[calc(75vh)]': type === 'third',
          'opacity-100': visible,
          'opacity-0': !visible,
        }
      )}
    >
      <div className='flex gap-x-10 w-1/2'>
        <Button type='first' active={type === 'first' && visible} />
        <Button type='second' active={type === 'second' && visible} />
        <Button type='third' active={type === 'third' && visible} />
      </div>
      <h1 className='font-bold text-[83px] w-1/2'>{title[type]}</h1>
      <p className='text-2xl w-1/2'>
        Create your own custom workspace! Our furnitures, especially created for
        designers and developers.
      </p>
    </div>
  );
}
