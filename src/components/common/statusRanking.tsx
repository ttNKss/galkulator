type StatusRankingProps = {
  combinations: Array<{ v1?: string; v2: string; total: number }>
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
      {combinations.map(({ v1, v2, total }, index) => (
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
            <span className='font-bold text-blue-600'>
              {total.toLocaleString()}
            </span>
          </div>
        </li>
      ))}
    </ol>
  </div>
)

export { StatusRanking }
