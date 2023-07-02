
const Alerta = ({alerta}) => {
  return (
    <>
        <div className={`${alerta.error ? 'from-red-400 to-red-500' : 'from-green-400 to-green-500'} bg-gradient-to-r text-center p-4 rounded-xl uppercase text-white font-bold text-2xl`}>
            {alerta.msg}
        </div>
    </>
  )
}

export default Alerta