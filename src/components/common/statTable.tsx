import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

interface StatTableProps {
  last: { Vo: number; Da: number; Vi: number }
  result: { Vo: number; Da: number; Vi: number }
}

const StatTable: React.FC<StatTableProps> = ({
  last: { Vo, Da, Vi },
  result: { Vo: Vo_result, Da: Da_result, Vi: Vi_result }
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
          <TableCell>{Vo}</TableCell>
          <TableCell>{Vo_result}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Da</TableCell>
          <TableCell>{Da}</TableCell>
          <TableCell>{Da_result}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Vi</TableCell>
          <TableCell>{Vi}</TableCell>
          <TableCell>{Vi_result}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>合計</TableCell>
          <TableCell>{Vo + Da + Vi}</TableCell>
          <TableCell>{Vo_result + Da_result + Vi_result}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export { StatTable }
