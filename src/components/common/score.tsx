import { rankKeys } from '@/utils/const'
import { score } from '@/utils/func'

interface ScoreProps {
  result: { Vo: number; Da: number; Vi: number }
}

const Score: React.FC<ScoreProps> = ({ result: { Vo, Da, Vi } }) => {
  return (
    <div className='mt-4 bg-gray-100 rounded-lg p-4'>
      <h4 className='font-semibold mb-3 text-lg text-center'>必要スコア</h4>
      <ul className='space-y-2'>
        {rankKeys.map(r => {
          const calculatedScore = score(r, Vo, Da, Vi)
          return (
            <li key={r} className='flex justify-between items-center'>
              <span className={'font-medium text-green-600'}>{r}</span>
              <span className={'text-green-600 font-bold'}>
                {calculatedScore.toLocaleString()}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export { Score }
