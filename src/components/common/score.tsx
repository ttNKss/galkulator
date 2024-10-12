import { rankKeys } from '@/utils/const'
import { score } from '@/utils/func'

interface ScoreProps {
  result: { vo: number; da: number; vi: number }
}

const Score: React.FC<ScoreProps> = ({ result: { vo, da, vi } }) => {
  return (
    <div className='mt-4'>
      <h4 className='font-semibold mb-2'>スコア</h4>
      <ul className='space-y-1'>
        {rankKeys.map(r => (
          <li key={r}>
            {r}: {score(r, vo, da, vi)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Score }
