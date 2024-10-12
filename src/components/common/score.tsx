import { rankKeys } from '@/utils/const'
import { score } from '@/utils/func'

interface ScoreProps {
  result: { Vo: number; Da: number; Vi: number }
}

const Score: React.FC<ScoreProps> = ({ result: { Vo, Da, Vi } }) => {
  return (
    <div className='mt-4'>
      <h4 className='font-semibold mb-2'>スコア</h4>
      <ul className='space-y-1'>
        {rankKeys.map(r => (
          <li key={r}>
            {r}: {score(r, Vo, Da, Vi)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Score }
