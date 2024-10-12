interface LabeledProps {
  label: string
  children: React.ReactNode
}

const Labeled: React.FC<LabeledProps> = ({ label, children }) => {
  return (
    <div className='flex flex-col items-start gap-1'>
      <h3 className='text-lg font-semibold'>{label}</h3>
      {children}
    </div>
  )
}

export { Labeled }
