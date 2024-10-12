import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from '@/components/ui/table'

interface StatTableProps {
  last: { vo: number; da: number; vi: number }
  result: { vo: number; da: number; vi: number }
}

const StatTable: React.FC<StatTableProps> = ({
  last: { vo, da, vi },
  result: { vo: vo_result, da: da_result, vi: vi_result }
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ステータス</TableHead>
          <TableHead>最終試験前</TableHead>
          <TableHead>最終試験後</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Vo</TableCell>
          <TableCell>{vo}</TableCell>
          <TableCell>{vo_result}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Da</TableCell>
          <TableCell>{da}</TableCell>
          <TableCell>{da_result}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Vi</TableCell>
          <TableCell>{vi}</TableCell>
          <TableCell>{vi_result}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>合計</TableCell>
          <TableCell>{vo + da + vi}</TableCell>
          <TableCell>{vo_result + da_result + vi_result}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export { StatTable }
