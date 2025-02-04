import ImageResponsive from '../../public/images/responsive.png';

function NoResponsive() {
  return (
    <div className='w-full flex justify-center items-center flex-col overflow-y-auto overflow-auto h-screen'>
      <div className='flex items-center justify-between flex-col p-7 rounded-xl bg-purple-300 bg-opacity-50 backdrop-blur-sm shadow-2xl border border-primaryMy max-w-96'>
        <img
          src={ImageResponsive}
          alt='Imagem relativa ao erro de responsividade'
          className='w-80'
        ></img>
        <p className='font-space-regular text-lg text-black mb-4'>
          Esta aplicação foi desenvolvida, por enquanto, apenas para
          dispositivos com telas grandes. Por favor, utilize uma tela com
          largura superior a 900px.
        </p>
      </div>
    </div>
  );
}

export default NoResponsive;

//  className='overflow-auto w-full'
// style={{
//   backgroundImage: `url(${backgroundImage})`,
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
// }}
