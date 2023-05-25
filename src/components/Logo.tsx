import star from '../../public/star.svg';
export default function Logo() {
  return (
    <div className='flex absolute top-7 left-8 z-30 items-center gap-x-[10px] md:gap-x-4'>
      <img src={star.src} alt='Star icon' className='w-8 h-8 md:w-12 md:h-12' />
      <span className='text-[#2D81E4] text-2xl md:text-4xl font-semibold'>
        IDEA
      </span>
    </div>
  );
}
