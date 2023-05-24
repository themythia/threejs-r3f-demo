import star from '../../public/star.svg';
export default function Logo() {
  return (
    <div className='flex absolute top-7 left-8 z-10 items-center gap-x-4'>
      <img src={star.src} alt='Star icon' />
      <span className='text-[#2D81E4] text-4xl font-semibold'>IDEA</span>
    </div>
  );
}
