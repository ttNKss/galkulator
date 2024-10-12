type StatusRankingProps = {
  combinations: Array<{
    v1?: string
    v2: string
    result: { Vo: number; Da: number; Vi: number }
  }>
  isLessonAndDrive: boolean
}

const StatusRanking: React.FC<StatusRankingProps> = ({
  combinations,
  isLessonAndDrive
}) => (
  <div className='bg-gray-100 rounded-lg p-6 shadow-md max-w-2xl w-full'>
    <h3 className='font-bold text-xl mb-4 text-center text-gray-800'>
      ステータス合計順
    </h3>
    <ol className='list-decimal list-outside space-y-2 pl-6'>
      {combinations.map(({ v1, v2, result: { Vo, Da, Vi } }, index) => {
        const total = Vo + Da + Vi
        return (
          <li
            key={index}
            className='p-2 bg-white rounded shadow-sm hover:bg-gray-50 transition-colors'
          >
            <div className='flex justify-between items-center'>
              <a
                href={`#${isLessonAndDrive ? `${v1}-${v2}` : v2}`}
                className='flex-grow'
              >
                <span>{`${isLessonAndDrive ? `${v1}-` : ''}${v2}`}</span>
              </a>
              <div className='flex space-x-2 items-center'>
                <span className='text-sm font-bold text-pink-600'>
                  {Vo.toLocaleString()}
                </span>
                <span className='text-sm font-bold text-blue-600'>
                  {Da.toLocaleString()}
                </span>
                <span className='text-sm font-bold text-yellow-500'>
                  {Vi.toLocaleString()}
                </span>
                <span className='font-bold text-green-600 pl-2'>
                  {total.toLocaleString()}
                </span>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  </div>
)

export { StatusRanking }
